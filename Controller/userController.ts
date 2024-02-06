import { Request, Response } from "express";
import { User } from "../models/User";
import { Interested } from "../models/Interested";
import { IUser } from "../models/interface/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, major, grade, skills, language }: IUser = req.body;
    const userData = {
      name,
      email,
      major,
      grade,
      skills,
      language,
    };
    const newUser = await User.create(userData);
    console.log(newUser);

    const newInterested = await Interested.create({ owner: newUser["_id"] });
    console.log(newInterested);

    const response = await User.updateOne(
      { _id: newUser["_id"] },
      { $set: { interesteds: newInterested["_id"] } }
    );
    res.status(201).json({
      user: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const response = await User.findOne({ email });
    if (response === null)
      return res
        .status(404)
        .json({ message: "해당 이메일은 존재하지 않습니다." });
    res.status(200).json({ data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const readAllUser = async (req: Request, res: Response) => {
  try {
    const response: IUser[] = await User.find();
    if (response === null)
      return res.status(400).json({ message: "데이터가 존재하지 않습니다." });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (email === null)
      return res.status(400).json({ message: "이메일이 필요합니다." });
    const updateData: Partial<IUser> = {};

    for (const key in req.body) {
      updateData[key as keyof Partial<IUser>] = req.body[key];
    }

    const response = await User.updateOne({ email }, updateData);

    res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const userInfo = await User.findOne({ email });
    if (userInfo === null)
      return res
        .status(400)
        .json({ message: "해당 이메일을 가진 유저는 존재하지 않습니다." });
    await Interested.deleteOne({ owner: userInfo["_id"] });
    const response = await User.deleteOne({ email });
    res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

export const updateLike = async (req: Request, res: Response) => {
  try {
    const { email, like } = req.body;
    const response = await User.updateOne({ email }, { $set: { like: like } });

    res.status(200).json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
