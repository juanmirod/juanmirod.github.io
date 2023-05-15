---
published: true
title: Prompt tips
layout: post
tags: [LLMs, prompt engineering] 
date: 12/05/2023
---

Some notes about prompt engineering techniques for ChatGPT from the free online course https://learn.deeplearning.ai/chatgpt-prompt-eng

Temperature recommended for applications (priorice predictability): 0
A temperature of 0.3-0.7 will tell the model to use different outputs every time using less probable outputs.

## Summarizing

Make a summary of a big text or return structured information that can be ingested
by other tools.

```
    Your task is to generate a short summary of a product
    review from an e-commerce site to give feedback to the
    Shipping department. 

    Summarize the review below, delimited by triple 
    backticks, in at most 30 words, and focusing on any aspects
    that mention shipping and delivery of the product. 

    Review: ```{prod_review}```
```

```
    Your task is to generate a short summary of a product
    review from an e-commerce site. 

    Summarize the review below, delimited by triple
    backticks in at most 20 words.

    Review: ```{prod_review}```
```

## Inferring

Extract information from a text like:

    - Sentiment analysis
    - Entity extraction
    - Monitoring information

```
    Identify the following items from the review text: 
    - Sentiment (positive or negative)
    - Is the reviewer expressing anger? (true or false)
    - Item purchased by reviewer
    - Company that made the item

    The review is delimited with triple quotes.
    Format your response as a JSON object with
    "Sentiment", "Anger", "Item" and "Brand" as the keys.
    If the information isn't present, use "unknown"
    as the value.
    Make your response as short as possible.
    Format the Anger value as a boolean.

    Review text: '''{lamp_review}'''
```

```
    Determine whether each item in the following list of
    topics is a topic in the text below, which
    is delimited with triple quotes.

    Give your answer as list with 0 or 1 for each topic.

    List of topics: {", ".join(topic_list)}

    Text sample: '''{story}'''
```

## Transforming

Reformat, edit or proofread a piece of text. Ex:

```
    Proofread and correct this review. Make it more compelling. 
    Ensure it follows APA style guide and targets an advanced reader. 
    Output in markdown format.
    Text: ```{text}```
```

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

## Customer service bot example

```
    You are OrderBot, an automated service to collect orders for a pizza restaurant. \
    You first greet the customer, then collects the order, \
    and then asks if it's a pickup or delivery. \
    You wait to collect the entire order, then summarize it and check for a final \
    time if the customer wants to add anything else. \
    If it's a delivery, you ask for an address. \
    Finally you collect the payment.\
    Make sure to clarify all options, extras and sizes to uniquely \
    identify the item from the menu.\
    You respond in a short, very conversational friendly style. \
    The menu includes \
    pepperoni pizza  12.95, 10.00, 7.00 \
    cheese pizza   10.95, 9.25, 6.50 \
    eggplant pizza   11.95, 9.75, 6.75 \
    fries 4.50, 3.50 \
    greek salad 7.25 \
    Toppings: \
    extra cheese 2.00, \
    mushrooms 1.50 \
    sausage 3.00 \
    canadian bacon 3.50 \
    AI sauce 1.50 \
    peppers 1.00 \
    Drinks: \
    coke 3.00, 2.00, 1.00 \
    sprite 3.00, 2.00, 1.00 \
    bottled water 5.00 \
```