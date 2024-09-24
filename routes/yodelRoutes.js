import express from "express";

app.post("/tweets", async (req, res) => {
  const { content, userId } = req.body;
  const newTweet = await prisma.tweet.create({
    data: {
      content,
      user: { connect: { id: userId } },
    },
  });
  res.json(newTweet);
});
