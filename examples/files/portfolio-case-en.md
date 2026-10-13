# Fictional example · Alex

Frontend developer

I build interfaces that make state and outcomes clear to the user\.

> Demonstration website: all people, projects and results are fictional.

## About

A fictional character illustrating this structure\. Projects and results are invented, not the buyer’s experience\.

## Tools and skills

JavaScript, React, CSS, UI testing

## Case studies

### Fictional example · Reliable form

> Fictional example — illustrative content, not the owner’s personal experience

Personal demonstration project: repeated submission and error recovery\.

**Problem and context**

Two quick clicks sent duplicate requests in a demo form\. A network error cleared the entered values\.

**My contribution**

Owned interface states and UI tests\. Another participant owned server\-side idempotency\.

**Technical decision**

Separated input, pending and error states\. Blocked repeated submission while pending and preserved values for retry after failure\.

**Trade-off and alternative**

Rejected a request queue because it complicated recovery for a single action\. Blocking the UI does not replace server\-side duplicate request protection\.

**Observed result**

Repeated\-click and retry checks pass in this fictional project\.

**Evidence behind the result**

Fictional artifacts only: PR \#42 and checkout\-retry\.txt\. No real files or production data exist\.

**Limits of the result**

Cannot claim all duplicate payments were eliminated or conversion improved\. Only the demo form’s behaviour was checked\.

**What I would change next time**

Agree frontend/server ownership boundaries at the start of the next task\.

**Stack**

React, JavaScript, UI testing

### Fictional example · Clear setup

> Fictional example — illustrative content, not the owner’s personal experience

Course team project: instructions for a first local run\.

**Problem and context**

The guide omitted an environment setup step\. Another participant could not run the project\.

**My contribution**

Rechecked the README and documented the missing step without secrets\. The service was built by the team; I do not claim sole authorship\.

**Technical decision**

Kept instructions with the code, verified a clean checkout and asked one participant to repeat the steps independently\.

**Trade-off and alternative**

Did not create a separate documentation site: for this small project it would add a second source of truth\.

**Observed result**

One participant completed setup using the revised guide in the fictional trial\.

**Evidence behind the result**

Fictional README diff and anonymised feedback note; the documents do not exist\.

**Limits of the result**

One trial does not establish faster team\-wide onboarding\. Before/after time was not measured\.

**What I would change next time**

Recheck instructions when environment requirements change\.

**Stack**

Markdown, Git, documentation
