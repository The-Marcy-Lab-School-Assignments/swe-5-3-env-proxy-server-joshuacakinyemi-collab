# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use the exact terms and concepts from the lesson.

Your responses will each be evaluated out of 6 points. You can earn 3 points for writing quality and 3 points for the accuracy and precision of the technical content per question.

---

## Question 1:

Why is it unsafe to make requests to a third-party API (like Giphy) directly from frontend JavaScript code? What specific risk does this create, and how can a malicious user exploit it?

**Your answer here**:

If the **frontend** application is sending the **fetch** request, all requests sent by the client will appear in the **Network** tab. This can be bad since if someone else gets hold of your **API key**, they could **steal** your request resources. Some APIs will **charge** you for each request that you make using your API key.

---

## Question 2:

What is the proxy server strategy? How does it help avoid exposing API Keys in client-side code while still providing access to APIs that require keys?

**Your answer here**:

The **proxy server strategy** is to put your API key within your **backend** code, keeping it **hidden** from the client. The client will be able to send the server a simple **request**, without the API key. Then the server will send the request to the API with the API key. When the server gets the response, it will send the **data** along to the client!

---

## Question 3:

What is an environment variable, and why do we store API keys in a .env file instead of directly in source code? What role does .gitignore play in this setup, and what could go wrong if the .env file were accidentally committed to GitHub?

**Your answer here**:

An **environment variable** is a hidden variable stored on the host's machine, which is accessible in **Node** through the `process.env` object. We store API keys in a .env file to keep anyone from having access to them. While setting up the `.env` file, you install the **dependencies** into the `.gitignore` file to keep it hidden from **GitHub**. If not set up properly, someone else can get hold of your API key.

---
