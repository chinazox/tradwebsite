# Chinazo & Chiebuka — Traditional Marriage Website

This is a responsive static wedding website built from the Canva/Wix drafts supplied by the couple.

## Pages / flow

Home → Event Information → RSVP

- RSVP = Yes → Accommodation → Secure Accommodation → Thank You
- RSVP = No → Thank You

The site intentionally has no normal navigation menu. Guests move through the intended sequence using the buttons.

## Response recording

The forms are configured for **Netlify Forms**. Once this folder is deployed to Netlify, submissions can be viewed in the Netlify site dashboard.

No card or bank details are collected by the site. The payment button is intentionally a placeholder:

`YOUR_STARLING_PAYMENT_LINK_HERE`

Replace that URL in `index.html` with the real Starling payment link.

## Deploying

1. Create a free Netlify account.
2. Create a new site and upload this folder (or connect a Git repository).
3. Netlify will detect the `rsvp` and `accommodation` forms.
4. In Netlify, add the custom domain:
   `traditional.foreveritanyi.com`
5. At the domain's DNS provider, create the DNS record Netlify gives you for the subdomain.
6. Replace the Starling payment URL in `index.html`.
7. Test the entire guest flow on both desktop and mobile before sending the invitation.

## Important

The site is designed to be edited by changing text/links in `index.html` and styling in `styles.css`. Do not put private bank account details, passwords, or card information into the public website repository.
