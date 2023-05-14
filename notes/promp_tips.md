---
published: false
title: Prompt tips
layout: post
tags: [LLMs, prompt engineering] 
date: 12/05/2023
---

Some notes about prompt engineering techniques for ChatGPT from the course https://learn.deeplearning.ai/chatgpt-prompt-eng

Temperature recomended for applicacions (priorize predictability): 0
A temperature of 0.3-0.7 will tell the model to use different outputs every time using less probable outputs.

## Summarizing

## Inferring

## Transforming

## Expanding

Turn a small piece of text into a longer, well structured text. ex.:

- Product technical sheet into product description
- Small email description into proper email
- Image description into prompt for generative model

Example prompts:

```
    You are a customer service AI assistant.
    Your task is to send an email reply to a valued customer.
    Given the customer email delimited by ```, \
    Generate a reply to thank the customer for their review.
    If the sentiment is positive or neutral, thank them for \
    their review.
    If the sentiment is negative, apologize and suggest that \
    they can reach out to customer service. 
    Make sure to use specific details from the review.
    Write in a concise and professional tone.
    Sign the email as `AI customer agent`.
    Customer review: ```{review}```
```