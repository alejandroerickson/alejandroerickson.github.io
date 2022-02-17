---
layout: post
title: 'What I learnt about Canada Registered Education Savings Plans'
thumbnail: '/images/resp-thumb.png'
comments: true
---

Canada offers a registered account to incentivise people to invest in their childrens' education. It's a bit complicated and most blogs and news articles I found only offer this very basic advice: "take advantage of the free money". It's not that bloody simple though.

**Anything and everything in my blog post could be factually incorrect. Please verify any information you get here with other, more reliable sources.** If you see a problem please let me know in the comments.

At a basic level the RESP works as follows: You incrementally add after-tax money to an account, to a maximum of $50,000.00, and the Government matches your yearly contributions with 20% each year, to a maximum of $7,200.00. You invest this money aggressively early on, and less aggressively later, while it is sheltered from taxes.  When the beneficiary, usually your child, attends a post-secondary they can receive money from the *gains* made by the investment, as well as from the *grant* itself, and pay tax on the money as if it were the beneficiary's income.

[The details, provided by the Canada Revenue Agency](https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps.html), get complicated though, which makes it hard to answer a number of questions without breaking out the spreadsheets.

  * How big will the investment be, after tax, if the beneficiary does not use the money?
  * If you have $50,000 when you open the account, should you dump it all into the RESP, or take advantage of the grant and make several payments over several years?
  
These questions pertain to how the money is paid out, so let me define those
ways. An
*[EAP](https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp/educational-assistance-payments-eaps.html)*
is a payment from the gains on the whole investment (grants and gains) made to
the beneficiary who is enrolled in a *qualifying educational program*. 
**EAPs are taxed as the beneficiary's income**.

An
*[AIP](https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-education-savings-plans-resps/payments-resp/accumulated-income-payments-aips.html)*
is a payment from the gains *on the contributions* to the subscribers (who
originally made the contributions). Grant money cannot be paid to the
subscribers, and it is lost if the beneficiary does not use it. The original
contributions were made by subscribers with after-tax money, so they are paid
out without additional taxation. **AIPs are taxed as the subscriber's income
plus 20%** (12% in Quebec).

Obviously there could be a significant difference in taxation between EAPs and
AIPs, so you need to consider the chance that AIPs will be paid out instead of
EAPs, and how much that will cost you. An additional, hidden cost, is that in a
normal taxable account, capital gains and dividends are taxed at a lower rate
than regular income. Let me illustrate this with a simplified example. 

Let's say you invest $10,000.00 for 10 years and it grows to $15,000.00. You
sell the investment in year 10 and declare $5000.00 in capital gains. Suppose further that
your combined federal and provincial income tax marginal rate is 32% and your
capital gains are taxed at 16%. Your beneficiary's income tax marginal rate is 21%.

  1. If the $5,000.00 gains are paid as EAPs, the beneficiary pays $1,050.00 in tax.
  2. If the $5,000.00 gains are paid as AIPs, the subscriber pays $2,600.00 in tax.
  3. If the $5,000.00 gains are paid as capital gains, the account holder pays $800.00.

The 20% penalty against AIPs is huge, of course, but the difference between
investing in a taxable account and getting EAPs is more subtle. Many investments
pay dividends, which are taxed a bit more heavily than the capital gains
mentioned in (3), plus the RESP account in (1) may have accumulated some
additional grant money. Let's consider that situation. Suppose the RESP also
earned the full 20% grant on the $10,000.00 in contributions, and that the
investment included some dividends that were taxed at 25%. Again, we are simplifying things.

  1. There are $5,000.00 gains and $2,000.00 in grants to be paid as EAPs. **The beneficiary receives $5,530.00** and pays $1,470.00 in tax.
  2. If the $5,000.00 gains are paid as AIPs, **the subscriber receives $2,400.00** and pays $2,600.00 in tax.
  3. If the $4,000.00 gains are paid as capital gains and $1,000.00 are paid as dividends, **the account holder receives $4,120.00** and pays $880.00 in tax.
     
As expected, the AIP payments remain the same, but the EAPs now yield a 34%
improvement on the gains in a normal taxable account. Of course, this is still a
bit too simple. Firstly, the $10,000 cannot be contributed to the RESP all at
once if the $2,000.00 in grants are to be obtained. That means that for some of
the time, that original $10,000.00 sits in a taxable account. Secondly, only up
to $36,000.00 of the RESP benefits from a 20% grant, because of the $7,200.00
limit on the total grant, so we can't apply the same logic to a $50,000.00 RESP
account.

### We'll need a [spreadsheet](https://docs.google.com/spreadsheets/d/1FItrYVojJt-z-MV1MikXilF5lS-Ij6ELvpcshyUX33k/edit?usp=sharing) to finish this ###

We are considering four ways of investing $50,000.00.

  1. Contribute the $50,000.00 to the RESP and get a $500.00 grant.
  2. Split the $50,000.00 over the RESP and a taxable account, and gradually move the money to the RESP to maximize the $7,200.00 grant.
  3. Put the $50,000.00 in a taxable account.
  4. Maximize the grant, but keep the remaining money in the taxable account.
  
And we are considering three ways the investment growth and grants can be taxed.

  1. Grants and investment growth are paid out as EAPs, taxed as the beneficiary's income.
  2. Grants are lost, but investment growth is paid out as AIPs (**after the beneficiary turns 21**), taxed as the subscriber's income.
  3. There are no grants, and the investments can be paid out any time, taxed as investment growth (capital gains, dividends, interest, etc).
  
We don't know in advance whether we'll have EAPs and not AIPs, so we factor the
likelihood into our assumptions. We need to make a bunch of assumptions, in fact
so let's make them.

Assumptions:
 - 6% growth (mostly stocks) for 10 years, then tapering off to 3% (mostly bonds) for the final years.
 - The money is tallied when the child is 21, the earliest year AIPs can be paid. Realistically the EAPs will be paid earlier.
 - The subscriber's family income is over 90k (if not, the grant gets paid a bit more aggressively).
 - Subscriber marginal rate is 32%.
 - Beneficiary marginal rate is 21%.
 - Avg investment tax is 20%.
 - Likelihood that EAPs are NOT needed is 20% (child gets scholarships, dies, drops out of school, whatever).
 
 The first eight bars plot the investment proceeds that would be paid out as AIPs,
 or as EAPs combined with whatever non RESP money exists in each investment
 method, after tax. The last four bars plot the expected value of the
 investments based on our assumptions above. The assumptions can be changed in
 the spreadsheet.
 
**[Play around with the spreadsheet here.](https://docs.google.com/spreadsheets/d/1FItrYVojJt-z-MV1MikXilF5lS-Ij6ELvpcshyUX33k/edit?usp=sharing)**
 
{% include image.html
    img="images/resp.png"
    title="RESP Returns by Investment Method."
    caption="RESP Returns by Investment Method."
    %}
 
## And the winner is... maximize the grant and keep the rest of your money out of the RESP! ##

Remarks: The definition of qualifying educational program is fairly broad and
inclusive, so if the beneficiary is alive, half-serious about any sort of
educational program and doesn't have a scholarship, they will probably use the
grant. Note also that some of the provinces offer an additional grant. For
example BC offers another $1,200.00 or so when the Child turns 6.

If you find any mistakes or oversights in my calculations or spreadsheet, please let me know in the comments!

Enjoy (taxes).

