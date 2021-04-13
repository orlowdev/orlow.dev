---
title: 'Automatically recurring dates in Notion'
date: '2021-04-08'
tags:
  - productivity
  - time-management
  - notion
song: 'https://music.apple.com/ru/album/love-is-madness-feat-halsey/1440900559?i=1440900578&l=en'
image: './hero.jpg'
imageAlt: 'Brett Jordan (Unsplash)'
description: "You can get your tasks to automatically recur - you set the interval, the formula does the rest. Here's how."
featured: true
published: false
imageShare: './og-image.png'
---

One of the features Notion notoriously lacks is recurring dates. There are multiple ways to mimic this behaviour, and in this article I'll share the one I find the most complete and informative.

[TL;DR 👇](#tldr)

To do this, we need a formula that and a bit of Maths. We'll take the date when recursion begins, and assign an interval at which it recurs. We'll then add a formula property, that will provide the next date recursion should happen, skipping all occurrencies in the past. I.e.:

> If the task started on Feb **1 2021**, it repeats **biweekly**, and today is **Apr 13 2021** - the next occurrence is going to be on **Apr 26 2021**.
>
> - ~~Feb 01 2021~~
> - ~~Feb 15 2021~~
> - ~~Mar 01 2021~~
> - ~~Mar 15 2021~~
> - ~~Mar 29 2021~~
> - ~~Apr 12 2021~~
> - Apr 26 2021

To make it work this way, we need subtract

## TL;DR

1. Create a date property called "Date"
2. Create a formula property called "Due"
3. Put this to the "Due" formula:

```excel
if(now() > prop("End Date"), prop("End Date"), if(prop("Status") == "Done!", prop("Date"), if(not empty("Repeat") and prop("Date") > now(), prop("Date"), if(prop("Repeat") == "Daily", dateAdd(prop("Date"), floor(floor((timestamp(now()) - timestamp(prop("Date"))) / 86400000) / 1) * 1 + 1, "days"), if(prop("Repeat") == "Weekly", dateAdd(prop("Date"), floor(floor((timestamp(now()) - timestamp(prop("Date"))) / 86400000) / 7) * 7 + 7, "days"), if(prop("Repeat") == "Biweekly", dateAdd(prop("Date"), floor(floor((timestamp(now()) - timestamp(prop("Date"))) / 86400000) / 14) * 14 + 14, "days"), if(prop("Repeat") == "Monthly", if(dateAdd(dateAdd(prop("Date"), year(now()) - year(prop("Date")), "years"), month(now()) - month(prop("Date")), "months") < now(), dateAdd(dateAdd(prop("Date"), year(now()) - year(prop("Date")), "years"), month(now()) - month(prop("Date")) + 1, "months"), dateAdd(dateAdd(prop("Date"), year(now()) - year(prop("Date")), "years"), month(now()) - month(prop("Date")), "months")), if(prop("Repeat") == "Quarterly", if(dateAdd(dateAdd(dateAdd(prop("Date"), round((month(now()) - month(prop("Date"))) / 3) * 3, "months"), year(now()) - year(prop("Date")), "years"), 24, "hours") < now(), dateAdd(dateAdd(prop("Date"), round((month(now()) - month(prop("Date"))) / 3) * 3 + 3, "months"), year(now()) - year(prop("Date")), "years"), dateAdd(dateAdd(prop("Date"), round((month(now()) - month(prop("Date"))) / 3) * 3, "months"), year(now()) - year(prop("Date")), "years")), if(contains(prop("Repeat"), "Semi-annually"), if(dateAdd(dateAdd(dateAdd(prop("Date"), round((month(now()) - month(prop("Date"))) / 6) * 6, "months"), year(now()) - year(prop("Date")), "years"), 24, "hours") < now(), dateAdd(dateAdd(prop("Date"), round((month(now()) - month(prop("Date"))) / 6) * 6 + 6, "months"), year(now()) - year(prop("Date")), "years"), dateAdd(dateAdd(prop("Date"), round((month(now()) - month(prop("Date"))) / 6) * 6, "months"), year(now()) - year(prop("Date")), "years")), if(contains(prop("Repeat"), "Annually"), if(dateAdd(dateAdd(prop("Date"), year(now()) - year(prop("Date")), "years"), 24, "hours") < now(), dateAdd(prop("Date"), year(now()) - year(prop("Date")) + 1, "years"), dateAdd(prop("Date"), year(now()) - year(prop("Date")), "years")), prop("Date")))))))))))
```
