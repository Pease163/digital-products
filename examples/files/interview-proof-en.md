# Interview Proof Kit — preparation

> Fictional example — illustrative content, not personal experience

## Vacancy

**Role**

Frontend Developer

**Company**

Fictional example · Paperplane Studio

**Vacancy source**

Fictional example — illustrative vacancy, not a real opening

**Job description**

Fictional example / Вымышленный пример
Build reliable React interfaces\. Write regression tests\. Explain technical trade\-offs\. Experience with production accessibility audits is a plus\.

**Notes**

Fictional example\. No company, metric or document below is real\. Не копируйте эти достижения в свой ответ\.

## STAR stories

### Fictional example · Duplicate form submissions

> Fictional example — illustrative content, not personal experience

**Situation**

Fictional example: a demo checkout allowed a second submission while the first request was pending\. The issue was reproduced with an artificial network delay\.

**My role and task**

My fictional responsibility was the frontend submit state and regression tests; a teammate owned backend idempotency\.

**My actions and reasoning**

I reproduced the double click, wrote a failing UI test, blocked repeated submissions while pending, preserved the form after failure and added a retry test\. I agreed the backend contract with my teammate\.

**Observed result**

The repeated\-click and failed\-request tests passed in the example project\. No production conversion or revenue data was collected\.

**Evidence and source**

Fictional artifacts only: example PR \#42; test report checkout\-retry\.txt; review note explaining backend ownership\. These documents do not exist\.

**Limits of my claims**

This is a fictional test result, not a production metric\. I cannot claim that all duplicate payments were eliminated\.

**Lesson / what I would change**

For a real answer I would distinguish frontend feedback from server\-side idempotency and state what I actually verified\.

**Topics**

debugging, reliability, testing / отладка

### Fictional example · Setup documentation

> Fictional example — illustrative content, not personal experience

**Situation**

Fictional example: the setup guide omitted a required environment variable; a teammate could not run a local build\.

**My role and task**

Document the missing step and check that another developer could follow it without my help\.

**My actions and reasoning**

I tested the instructions from a clean checkout, recorded the missing variable without secrets and asked one teammate to repeat the setup\. I corrected the step they found unclear\.

**Observed result**

In the fictional trial one teammate completed setup using the revised guide\. No reliable comparison of onboarding time exists\.

**Evidence and source**

Fictional artifacts only: README diff, setup checklist and one anonymised feedback note\. No real records are attached\.

**Limits of my claims**

One trial cannot establish a team\-wide productivity improvement\. No percentage or time reduction is claimed\.

**Lesson / what I would change**

A small observed outcome is enough; I do not need to invent a larger business result\.

**Topics**

communication, learning / коммуникация

## Requirements matrix

### Write regression tests for interactive UI

**Priority**

Required

**Evidence status**

Example available

**Linked story**

Fictional example · Duplicate form submissions

**Actual experience**

Fictional example: wrote failing and passing tests around repeated submission and retry\.

**Gap / unverified**

No gap in the fictional example for this narrow task\.

**Next step**

In my own workspace, name an actual test and explain the failure it catches\.

### Production accessibility audit experience

**Priority**

Preferred

**Evidence status**

Gap / unverified

**Linked story**

Not filled in

**Actual experience**

Fictional example: only keyboard checks in a personal demo; no production audit\.

**Gap / unverified**

No real production audit experience to claim\.

**Next step**

Complete a keyboard and screen\-reader check on one personal form, document scope and ask the interviewer what audit work the role involves\.

## Answer practice

Answer self-review: 0 — not yet, 1 — partial, 2 — concrete. This is not a professional suitability or hiring probability assessment.

### debugging

**Answer draft**

Fictional example: I reproduced duplicate clicks using delayed responses, added a regression test, changed the pending state and verified the retry path\. Backend idempotency was my teammate’s responsibility\.

**Linked story**

Fictional example · Duplicate form submissions

**Change for the next attempt**

Name the failing assertion and explain how I ruled out a server\-side issue\.

**Clarity**

2

**Personal contribution**

2

**Factual support**

1

**Reflection and limits**

1

## Seven-day plan

### Day 1

Done

**Notes**

Fictional example: extracted two requirements and kept the audit experience as an explicit gap\.

### Day 2

In progress

**Notes**

Not filled in

### Day 3

In progress

**Notes**

Not filled in

### Day 4

In progress

**Notes**

Not filled in

### Day 5

In progress

**Notes**

Not filled in

### Day 6

In progress

**Notes**

Not filled in

### Day 7

In progress

**Notes**

Not filled in
