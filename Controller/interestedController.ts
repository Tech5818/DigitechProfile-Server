import { Request, Response } from "express";
import { User } from "../models/User";
import { Interested } from "../models/Interested";

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
    res.status(400).json({ message: error });
  }
};

export const createInterestedProject = async (req: Request, res: Response) => {
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
    res.status(400).json({ message: error });
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

    res.status(200).json({ data: response });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
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
    res.status(400).json({ message: error });
  }
};
