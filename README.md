# WebForge website

A responsive, single-page marketing website for WebForge, a website design and development studio.

## Files
- `index.html` — page structure and content
- `styles.css` — responsive styling and visual design
- `script.js` — mobile navigation, current year, and contact form behavior
- `favicon.svg` — simple WebForge browser-window logo

## Run locally
Open `index.html` in a browser. For a local development server, you can use the VS Code Live Server extension or run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Configure the contact form
The contact form submits to FormSubmit at `https://formsubmit.co/webforgemodernwebsites@gmail.com`. On the first submission, FormSubmit sends a verification email to that inbox. Open that email and confirm the address before expecting future inquiries to be delivered. Check the spam folder if the verification message does not arrive.

The form uses FormSubmit's AJAX endpoint to show an on-page result and retains FormSubmit's CAPTCHA protection. Test it from the deployed site (or a local web server), not by opening `index.html` as a `file://` URL. A success message appears only after FormSubmit returns a successful response; network errors or unconfirmed responses show an error so the visitor can retry.

To test after deployment, submit a test inquiry with an email address you can access, complete any CAPTCHA challenge, verify the recipient address when FormSubmit asks, and then submit another test inquiry. Confirm the follow-up submission arrives in the WebForge inbox.

## Notes
- Portfolio items are clearly presented as concept projects, not real client work.
- The site uses Google Fonts when an internet connection is available, with generic sans-serif fallbacks.
- Review all copy, service details, and contact configuration before publishing.
