import { Router } from "express";
const userRoutes = Router();
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import { authMiddlware } from "./middlewares/authMiddlware";
import { generateAndStoreTest, getUserIdByEmail } from "./controller.js";

const prisma = new PrismaClient();

// function for hashing password
async function hash(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function userExists(email) {
  try {
    const response = await prisma.user.findUnique({
      where: { email: email },
    });
    return response;
  } catch (error) {
    console.log("error in  checking userexists", error);
  }
}
// Define routes

const loginDataSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
//login route
userRoutes.get("/login", async (req, res) => {
  try {
    const logindata = req.body;
    const validatedBody = loginDataSchema.safeParse(logindata);
    if (!validatedBody) {
      return res.status(500).json({ msg: "invalid signup body " });
    }

    const user = await userExists(logindata.email);
    if (!user) {
      return res.status(404).json({ msg: "user not found please register" });
    }
    const password = req.body.password;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);

    return res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    console.log("error while loggin in ", error);
    return res.status(500).json({ msg: "error while logging in " });
  }
});

//siunp schema zod
const signupSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});

// signup route
userRoutes.post("/signup", async (req, res) => {
  const signuupData = req.body.userCred;

  // to validate using zod
  const validatedBody = signupSchema.safeParse(signuupData);
  if (!validatedBody) {
    return res.status(500).json({ msg: "invalid signup body " });
  }

  // check if user already exist in database -----------------------
  const existinguser = await prisma.user.findUnique({
    where: { email: signuupData.email },
  });

  if (existinguser) {
    console.log(existinguser);
    return res.json({ msg: "email already exists" });
  }
  //-------------------------------------------------------------------

  //
  try {
    const hashedPass = await hash(signuupData.password);
    // console.log(hashedPass, "this msg is from signup route hased pass ");
    const response = await prisma.user.create({
      data: {
        email: signuupData.email,
        name: signuupData.name,
        password: hashedPass,
      },
    });

    const token = jwt.sign({ email: response.email }, JWT_SECRET);
    //  console.log("this is email from database ",response.email ,typeof(response.email));  //this was to check type of emaild

    return res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "error in signup " });
  }
});

// Define the schema for the test parameters
const testParamSchema = z.object({
  subject: z.number(), /// innitially the id of subject is given and then later changer into subject topic
  // topics: z.array(z.number()),
  topics: z.array(z.string()),
  difficulty: z.string(),
  count: z.number(),
  additionalContext: z.string(),
});

const genrateBodySchema = z.object({
  title: z.string(),
  testparam: z.object({
    subject: z.number(), /// innitially the id of subject is given and then later changer into subject topic
    topics: z.array(z.string()),
    difficulty: z.string(),
    count: z.number(),
    additionalContext: z.string(),
  }),
});

// test genrate route
userRoutes.post("/genrate", authMiddlware, async (req, res) => {
  try {
    const body = genrateBodySchema.safeParse(req.body);
    if (!body) {
      return res.status(500).json({ msg: "invalid input testbody" });
    }
    const testparam = req.body.testparam;
    const testbody = testParamSchema.safeParse(testparam);
    if (!testbody.success) {
      return res.json({ msg: "invalid input /testparam" });
    }
    // console.log(req.email);
    console.log("req.body.title=", req.body.title);
    // console.log(req.body.title)
    console.log("getting users id by email");
    const userID = await getUserIdByEmail(req.email);
     console.log("got users ID")


     
    generateAndStoreTest(userID, testparam, req.body.title);
  } catch (error) {
    console.log("error accured while genration tests", error);
    res.status(500).json({ msg: "error while genrating  test" });
  }
});

userRoutes.get("/protected", authMiddlware, (req, res) => {
  res.send("this is protected route and and you are athorised ");
});

export default userRoutes;
