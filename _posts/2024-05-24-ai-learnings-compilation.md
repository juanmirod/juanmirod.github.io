---
published: true
title: AI learnings compilation
layout: post
tags: [Inteligencia Artificial]
---

It's been years since I am interested in AI, I read and I listen to podcasts and do some courses and learn to use APIs and models... but I am not working on AI (directly at least), I don't have a CV or projects that I can show, I don't have a real course, master or anything. I have decided to keep doing
it this way, because it is the way that works for me and motivates me, but I want to try to be more intentional and write down what I do and what I learn. This is an informal journal of those learnings,
maybe in the future I will decide to do some kind of curriculum, but this is good enough to start.

## Learning about LLMs

To learn more about LLMs and embeddings' models and how they really are trained and a little bit of the theory so I have a more complete understanding I am reading:

[Hands-On Large Language Models](https://www.llm-book.com/) - This book by Jay Alammar is a great step by step guide through the different types of models, their applications, how to use them and a bit of the theory. Complementary to the book there are a lot of resources linked in the book and created by Jay Alammar like [The ilustrated transformer](https://jalammar.github.io/illustrated-transformer/) or the course in Deeplearning [How transformers work](https://www.deeplearning.ai/short-courses/how-transformer-llms-work/). I recommend all of them as this is a pretty dense topic and seeing it in different formats will help to digest it.

In the same line but more code intensive it is really illustrative the video [Let's build GPT](https://www.youtube.com/watch?v=kCc8FmEb1nY) by Andrej Karpathy. If you have no idea of Pytorch I recommend reading first the [60 minutes blitz to pytorch](https://docs.pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) and playing a bit with the examples or even continue with the pytorch tutorials. That way you will understand much better the code that Karpathy explains in the video.

And another complementary material is the [playlist in 3Blue1Brown about neural networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) it is great to have a visual explanation and a better mental model of what a neural network is, how it works conceptually and mathematically and bottom up, from an example with a couple of layers of NN to transformers and attention.

## Geoffrey Hinton

I watched the other day an interview to Geoffrey Hinton, it's interesting to listen to him because he has a lot of perspective from many years of experience and working with a lot of people, the interview is:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/n4IQOBka8bc?si=o84QL6sc_eTdXqf_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

My key insights from the interview:

- He also (as Sam and Ilya) thinks that more scale produces more intelligence, clever algorithms are nice thought experiments, but they are probably not needed.
- Things he would add to current models:
  - More time scales for learning (he says we only have two because we only have training and zero-shot or context, but IMO we have three scales: pre-training, post-training: RLHF or instruction tunning...) and context
  - A way for the model to "reason" about something and learn from the reasoning, he is referring to some kind of RL for LLMs.
- Digital computation is much more powerful because it scales better and it is repeatable, analogical computation, even artificial one, is not repeatable because the same weights won't work in another analogical computer.
- Chomsky is wrong: language is not innate, general learning processes can produce and understand language. (this is practically a consensus in computer science circles now, but still very controversial in linguistics circles where Chomsky is the father of the field).
- About choosing people and problems: follow your gut, there are people that you see that "get it" and people that you see that think outside the box, similarly with the problems, sometimes something doesn't fit and you have to double down there... I think his intuitions are good because he is very intelligent himself, this advice may not apply to everyone

He of course has lots of interviews an talks since he leaved Google, I may add some others if I find them interesting.

## Peter Norvig

A talk and some questions for Peter Norvig about the future of programming combined with LLMs

<iframe width="560" height="315" src="https://www.youtube.com/embed/ia6aJIplmtc?si=0xnBr7VehBR3hN_A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Insights from the interview:

- I agree with most of what Norvig says about hybrid systems and combining LLMs with tools, formal languages and Knowledge bases, that is the way it is
  definitely taking some months later and I think we still need to see more developments around that. Cohere also advocates for tool use to give more agency to LLMs and I think that is OpenAI will be doing with GPT-5.
- This is the pytude he talks about that uses word embeddings and PALM-2: <https://github.com/norvig/pytudes/blob/893b4aa82abe5d6c5b0f6c4082501c2694df724c/ipynb/OneLetterOff.ipynb#L503>
- About fairness and errors, I think he also is very sensible: we are giving more difficult problems to this systems and expecting them to do it better than ourselves. First we need to define what we mean by fairness, then we need to implement that, and any implementation it is going to prioritize some people over other because time and effort is limited and we need to put that time and effort into features somewhat sequentially.

## Gary Marcus

To level a bit the hype, a keynote from Gary Marcus in AGI24, where he talks about the pitfalls of the transformer frenzy and the scaling laws. He even predicts that we are in the edge of a new IA winter because GenAI is not delivering enough value to compensate the huge amounts of money spend in training in the last years (OpenAI is the most notable example, because they have made it to several economics newspapers lately because it is claimed that they lost $5B last year, but he also talks about Mustafa Suleyman or Dario Amodei leaving as a sign of this coming buble burst or disinvestment wave or however you want to call it)

Gary Marcus is considered a "doomer" and he has an unusually hard and moderate view on the state of AI. To me, even if we have a disinvestment wave in GenAI and people stop trying to train bigger and bigger LLMs models, we still have to discover a lot of uses for the LLMs that we have. We are lucky to have open models like LLAMA3 and comman-r and others that can be really useful in many tasks even if they don't deliver on the promise of AGI or agentic AI, and we still have a good decade ahead discovering new applications of LLMs and integrating them on a lot of tools, making them faster, smaller, more efficient and more useful...

<iframe width="560" height="315" src="https://www.youtube.com/embed/91SK90SahHc?si=FJjtm8qUb13ORazD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# Jodie Burchell

This talk by Jodie Burchell is really an amazingly well delivered summary of the evolution of ML until now, how LLMs work, when they work best and a skeptic view on AGI and ASI, very well defended. She finishes with how to use them with a sample RAG application in a notebook. She also has the notebook and all the references from the talk [in this repo](https://github.com/t-redactyl/simple-rag-document-qa/tree/main)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Pv0cfsastFs?si=Vlx0i5TpF226AOQm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

# Andrej Karpathy

Great talk from Andrej Karpathy about the evolution in software in the last years

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/LCEmiRjPEtQ?si=tLKYTCf8s1HvE2aU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

**Key insights for me:**

- This is decade of agents, not the year, it's going to take time to integrate them (think Waymo)
- Models ate part of the software stack: tasks that required lots of code are now done with a call to a model.
- Prompt/context is like programming the models, but in plain English.
- We need to keep humans in the loop (and agents on a leash) and build tools that allow this loop to be faster and easier (like Cursor)
- We are still building the Ironman suit, we can't pretend we can build completely autonomous robots (yet)
- GUIs are still highly valuable for humans
- Markdown documentation and tools like MCP for agents

# Laura Tacho

Measuring the impact of AI on software engineering – with Laura Tacho

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/xHHlhoRC8W4?si=3UPwtoDEuR2qxVxc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

To me this conversation validates some things I have experience myself and talk about:

- The productivity improvements is not in lines of code, typing speed never was the bottleneck.
- But they see compounding improvements in DevEx, complexity of the tasks that one developer can accomplish and in other tasks like inspecting stack traces, debugging, understanding the code or doing big refactors.
- Documenting is good for humans and for AI, but documentation has to be optimized for AI (code examples instead of screenshots, programatic ways to do things instead of GUI's How To)
- Adoption is important, having the tools and licenses for everyone is important to get everyone on board and not only the early adopters.
- AI is good at tasks with a lot of structure like YAML config files, unit tests and refactoring, no so good at "frontier" work where there is not many examples or any line of code counts.
- When writing code is cheaper, you end up doing more of the rest of the job: alignment, meetings, design, monitoring, gathering feedback... so the future looks like more like product engineering and less like all day coding.
