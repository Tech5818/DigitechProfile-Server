import { Request, Response } from "express";
import { User } from "../models/User";
import { Project } from "../models/Project";
import { IProject } from "../models/interface/project";

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, desired, content, authorEmail, thumbnail } = req.body;

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
      thumbnail,
    };

    const project = await Project.create(newProject);
    await User.updateOne(
      { _id: user["_id"] },
      { $push: { postProject: project["_id"] } }
    );
    res.status(201).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findOne({ _id: projectId });
    if (project === null)
      return res
        .status(400)
        .json({ message: "해당 ID를 가지는 프로젝트는 존재하지 않습니다." });

    res.status(200).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readAllProject = async (req: Request, res: Response) => {
  try {
    const response = await Project.find();
    if (response === null)
      return res
        .status(204)
        .json({ message: "프로젝트가 아예 존재하지 않습니다." });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findOne({ _id: projectId });
    if (project === null)
      return res
        .status(400)
        .json({ message: "해당 ID를 가지는 프로젝트는 존재하지 않습니다." });

    const updateData: Partial<IProject> = {};

    for (const key in req.body) {
      updateData[key as keyof Partial<IProject>] = req.body[key];
    }

    const response = await Project.updateOne(
      { _id: project["_id"] },
      { $set: updateData }
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const updateLikeProject = async (req: Request, res: Response) => {
  try {
    const { projectId, like } = req.body;

    const project = await Project.findOne({ _id: projectId });
    if (project === null)
      return res
        .status(400)
        .json({ message: "해당 ID를 가지는 프로젝트는 존재하지 않습니다." });

    const response = await Project.updateOne(
      { _id: project["_id"] },
      { $set: { like: like } }
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.body;

    const project = await Project.findOne({ _id: projectId });
    if (project === null)
      return res
        .status(400)
        .json({ message: "해당 ID를 가지는 프로젝트는 존재하지 않습니다." });
    const author = await User.findOne({ _id: project["author"] });
    await User.updateOne(
      { _id: author!["_id"] },
      { $pull: { postProject: project["_id"] } }
    );
    const response = await Project.deleteOne({ _id: project["_id"] });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
