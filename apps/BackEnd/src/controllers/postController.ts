import { Request, Response, NextFunction } from "express";

import Post, { IPost } from "../models/postModel";
import Comment, { IComment } from "../models/commentModel";

import dotenv from "dotenv";

dotenv.config();

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body.titlePost || !req.body.content) {
    return res.status(400).json({
      error: "Veuillez remplir tous les champs pour votre POST s'il vous plait !",
    });
  }

  const myFile = req.file;
  const postData: Partial<IPost> = {
    titlePost: req.body.titlePost,
    content: req.body.content,
    date: new Date(),
    ...(myFile && {
      image: `${req.protocol}://${req.get('host')}/images/${myFile.filename}`,
    }),
  };

  try {
    const post = await Post.create(postData);
    res.status(201).json({ message: 'Post enregistré avec succès !', post });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idPost = req.body.idPost;
  const myFile = typeof req.body.file;
  const postData: Partial<IPost> = {
    titlePost: req.body.titlePost,
    content: req.body.content,
    ...(myFile !== "undefined" && {
      image: `${req.protocol}://${req.get("host")}/images/${req.body.file.filename}`,
    }),
  };

  try {
    const updatedPost = await Post.findByIdAndUpdate(idPost, postData, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({
        message:
          "Le post que vous souhaitez modifier n'existe pas, merci de réessayer...",
      });
    }
    res.status(200).json({
      message: "Le POST a été mis à jour, merci !",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idPost = req.params.idPost;
  try {
    const post = await Post.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: "Post introuvable..." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPostsByCategorie = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categorie = req.params.categorie;
  try {
    const posts = await Post.find({ categorie });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPostAndComments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idPost = req.params.idPost;
  try {
    const post = await Post.findById(idPost);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comments = await Comment.find({ idPost });
    res.status(200).json({ post, comments });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// permet de creer un commentaire
export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const idPost = req.params.idPost;
  try {
    const post = await Post.findById(idPost);
    if (!post) {
      return res.status(404).json({
        message:
          "Le post auquel vous souhaitez ajouter un commentaire n'existe pas, merci de réessayer",
      });
    }
    if (req.body.message === "") {
      return res.status(400).json({
        error: "Veuillez remplir tous les champs pour votre commentaire SVP !",
      });
    }
    const commentData: Partial<IComment> = {
      message: req.body.message,
      idPost: req.body.idPost,
      idUser: req.body.id,
    };
    await Comment.create(commentData);
    res.status(201).json({ message: "Commentaire enregistré !" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
