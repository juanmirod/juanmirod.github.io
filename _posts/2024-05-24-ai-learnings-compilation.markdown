---
published: true
title: AI learnings compilation
layout: post
tags: [Inteligencia Artificial]
---

It's been years since I am interested in AI, I read and I listen to podcasts and do some courses and learn to use APIs and models... but I am not working on AI (directly at least), I don't have a CV or projects that I can show, I don't have a real course, master or anything. I have decided to keep doing
it this way, because it is the way that works for me and motivates me, but I want to try to be more intentional and write down what I do and what I learn. This is an informal journal of those learnings,
maybe in the future I will decide to do some kind of curriculum, but this is good enough to start.

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
- This is the pytude he talks about that uses word embeddings and PALM-2: https://github.com/norvig/pytudes/blob/893b4aa82abe5d6c5b0f6c4082501c2694df724c/ipynb/OneLetterOff.ipynb#L503
- About fairness and errors, I think he also is very sensible: we are giving more difficult problems to this systems and expecting them to do it better than ourselves. First we need to define what we mean by fairness, then we need to implement that, and any implementation it is going to prioritize some people over other because time and effort is limited and we need to put that time and effort into features somewhat sequentially.
