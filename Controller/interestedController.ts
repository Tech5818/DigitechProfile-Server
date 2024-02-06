import { Request, Response } from "express";
import { User } from "../models/User";
import { Interested } from "../models/Interested";
import { Project } from "../models/Project";

export const createInterestedProfile = async (req: Request, res: Response) => {
  try {
    const { email, targetEmail } = req.body;

    const targetUser = await User.findOne({ email: targetEmail });

    if (targetUser === null)
      return res
        .status(400)
        .json({ message: "targetEmail에 대한 유저는 존재하지 않습니다." });

    const user = await User.findOne({ email });
    if (user === null)
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저는 존재하지 않습니다." });

    const response = await Interested.updateOne(
      { _id: user["interesteds"] },
      { $push: { profiles: targetUser["_id"] } }
    );

    res.status(201).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const createInterestedProject = async (req: Request, res: Response) => {
  try {
    const { email, projectId } = req.body;

    const project = await Project.findOne({ _id: projectId });

    if (project === null)
      return res
        .status(400)
        .json({ message: "해당 ID를 가지는 프로젝트는 존재하지 않습니다." });

    const user = await User.findOne({ email });
    if (user === null)
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저는 존재하지 않습니다." });

    const response = await Interested.updateOne(
      { _id: user["interesteds"] },
      { $push: { projects: project["_id"] } }
    );

    res.status(201).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readInterested = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (user === null)
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저는 존재하지 않습니다." });

    const response = await Interested.findOne({ _id: user["interesteds"] });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteInterestedProfile = async (req: Request, res: Response) => {
  try {
    const { email, targetEmail } = req.body;

    const targetUser = await User.findOne({ email: targetEmail });
    if (targetUser === null)
      return res
        .status(400)
        .json({ message: "targetEmail에 대한 유저는 존재하지 않습니다." });

    const user = await User.findOne({ email });
    if (user === null)
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저는 존재하지 않습니다." });

    const userInterested = await Interested.findOne({
      _id: user["interesteds"],
    });
    userInterested?.profiles?.map(async (value, idx) => {
      if (JSON.stringify(value) !== JSON.stringify(targetUser._id)) {
        return res.status(400).json({
          message:
            "targetEmail을 가지는 유저는 유저의 Interested 목록에 포함되어 있지 않습니다.",
        });
      }
      const response = await Interested.updateOne(
        { _id: user["interesteds"] },
        { $pull: { profiles: targetUser["_id"] } }
      );
      return res.status(200).json({ message: response });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteInterestedProject = async (req: Request, res: Response) => {
  try {
    const { email, projectId } = req.body;

    const project = await Project.findOne({ _id: projectId });
    if (project === null)
      return res
        .status(400)
        .json({ message: "해당 ID를 가지는 프로젝트는 존재하지 않습니다." });

    const user = await User.findOne({ email });
    if (user === null)
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저는 존재하지 않습니다." });

    const userInterested = await Interested.findOne({
      _id: user["interesteds"],
    });
    userInterested?.projects?.map(async (value, idx) => {
      if (JSON.stringify(value) !== JSON.stringify(project._id)) {
        return res.status(400).json({
          message:
            "projectId를 가지는 프로젝트는 Interested 목록에 포함되어 있지 않습니다.",
        });
      }
      const response = await Interested.updateOne(
        { _id: user["interesteds"] },
        { $pull: { projects: project["_id"] } }
      );
      return res.status(200).json({ message: response });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
