import type { NextApiRequest, NextApiResponse } from "next";

type Yodel = {
  id: number;
  message: string;
};

const yodels: Yodel[] = [];
let nextId = 1;

// Create a new yodel
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST":
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      const newYodel: Yodel = { id: nextId++, message };
      yodels.push(newYodel);
      return res.status(201).json(newYodel);

    case "GET":
      // Return all yodels
      return res.status(200).json(yodels);

    case "PUT":
      const updateId = parseInt(req.query.id as string);
      const yodelToUpdate = yodels.find((y) => y.id === updateId);
      if (!yodelToUpdate) {
        return res.status(404).json({ error: "Yodel not found" });
      }
      const updateMessage = req.body.message;
      if (!updateMessage) {
        return res.status(400).json({ error: "Message is required" });
      }
      yodelToUpdate.message = updateMessage;
      return res.status(200).json(yodelToUpdate);

    case "DELETE":
      const deleteId = parseInt(req.query.id as string);
      const yodelIndex = yodels.findIndex((y) => y.id === deleteId);
      if (yodelIndex === -1) {
        return res.status(404).json({ error: "Yodel not found" });
      }
      yodels.splice(yodelIndex, 1);
      return res.status(204).send("yay");

    default:
      res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
