import { Request, Response } from "express";
import { User } from "../models/User";
import { Project } from "../models/Project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, desired, content, authorEmail } = req.body;

    const user = await User.findOne({ email: authorEmail });
    if (user === null)
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저는 존재하지 않습니다." });

    const newProject = {
      title,
      desired,
      content,
      author: user["_id"],
    };

    const project = await Project.create(newProject);
    await User.updateOne(
      { _id: user["_id"] },
      { $push: { postProject: project["_id"] } }
    );
    res.status(201).json();
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
};
