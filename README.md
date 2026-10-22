# Sastha Engineering Website

Static website (HTML, CSS, JavaScript). No build step and no backend. Works on laptop and phone.

## Folder structure

```
Sastha-Engineering-Website/
  index.html      page content
  style.css       all design and colours (phone layout is at the bottom, see below)
  script.js       tabs, animations, image viewer, video player, contact form
  README.md       this file
  images/         all photos, logos and the about video
```

Keep these files together. File names are case-sensitive on web hosts, so use lowercase exactly as listed below.

## Run it on your computer

1. Keep `index.html`, `style.css`, `script.js` and the `images` folder in one folder.
2. Double-click `index.html`.
3. After editing, save and press Ctrl+F5 in the browser to reload without the cache.

Fonts need internet. Without it, Arial is used.

## Tabs

The menu has Home, Products, Machines, Quality, Customers and Contact.

- **Home** shows by default: hero, numbers strip, About the company (video and text), Vision.
- **Products**: Bonnet lock, Valve body and Pulley tensioner (child part and assembled part photos for each), plus a row of four turned-part photos.
- **Machines**: photos of the machine shop and the list of machines table.
- **Quality**: a photo grid of the inspection instruments, with the name on each photo.
- **Customers**: customer logos first, then the table of parts supplied.
- The Contact section (details, enquiry form, both maps) and the Request a Quote button are visible on every tab.

## Photo viewer and video

- Click (laptop) or tap (phone) any photo on Products, Machines or Quality to open it full screen.
- Use the ‹ and › buttons, swipe left or right, or press the left and right arrow keys to move to the next photo. Close with the × button, by clicking the dark area, or with Esc. A counter such as "2 / 10" shows the position.
- The About video plays silently on a loop. Click or tap it to open a full-screen player with controls (it starts muted; use the controls to turn the sound on).
- The big photo on the Machines tab shows a "Click to expand" label (laptop) or "Tap to expand" (phone).

## Images to add (put all in the `images` folder)

| Filename | Where it appears |
|---|---|
| hero.jpg | Hero background, first photo (Factory 1) |
| hero-2.jpg | Hero background, second photo (Factory 2). The slideshow alternates between the two |
| about.mp4 | About section video (MP4, H.264). See the note below about file size |
| about.jpg | About section picture |
| bonnet-child.jpg, bonnet-assembly.jpg | Products, Bonnet lock |
| valve-child.jpg, valve-assembly.jpg | Products, Valve body |
| pulley-child.jpg, pulley-assembly.jpg | Products, Pulley tensioner |
| product-1.jpg to product-4.jpg | Products, row of four photos |
| machine-shop-1.jpg to machine-shop-3.jpg | Machines tab (1 is the big photo) |
| logo-sastha.png | Navigation logo and browser tab icon |
| logo-sundram.png | Sundram Fasteners logo |
| logo-sdf.png | Same Deutz Fahr logo |
| logo-mitsuba.png | Mitsuba India logo |
| logo-auto-ignition.png | Auto Ignition logo |
| logo-prabha.png | Prabha Engineering logo |
| logo-motion.png | Motion Industries logo |
| logo-apa.png | APA Engineering logo |
| logo-simpson.png | Simpson logo (placeholder until the file is added) |

### Quality tab photos (13 instruments)

| Filename | Instrument |
|---|---|
| inspection-profile-projector.jpg | Profile projector |
| inspection-2.jpg | Video measurement system |
| inspection-3.jpg | Trimos 2D height gauge |
| inspection-roughness-tester.jpg | Roughness tester |
| inspection-height-gauge.jpg | Height gauge |
| inspection-air-gauge.jpg | Air gauge |
| inspection-slip-gauges.jpg | Slip gauges |
| inspection-bore-dial-gauges.jpg | Bore dial gauges |
| inspection-pitch-micrometer.jpg | Pitch micrometer |
| inspection-digital-micrometer.jpg | Digital micrometer |
| inspection-digital-vernier.jpg | Digital vernier |
| inspection-refractometer.jpg | Refractometer |
| inspection-1.jpg | Coordinate measuring machine (CMM) |

A missing photo shows a dark or dashed placeholder with the file name, so you can see what to add. Missing files also show as `ERR_FILE_NOT_FOUND` in the browser console, which is harmless. In the Quality tab, only photos that exist can be opened in the viewer.

Tips: JPG for photos, PNG with transparent background for logos, about 1200 x 900 px for photos, 1920 x 1000 px for the hero. Use customer logos only with their permission.

**Video size:** a large video (for example 80 MB) loads slowly on mobile data, and it now plays automatically. Compress it to 720p, about 2 Mbps (roughly 3 to 8 MB for a 30 second clip) before uploading.

## What to edit and where

| To change | Open | Search for |
|---|---|---|
| Text, phone, email, addresses | index.html | the text itself |
| Numbers strip (employees, turnover) | index.html | `data-to` |
| Machines table rows | index.html | `List of machines` |
| Customers table rows | index.html | `Who we supply` |
| Add or rename a Quality instrument | index.html | `q-gal` (one `figure` per instrument) |
| Add a customer logo | index.html | `class="logos"` (one `figure` per logo) |
| Colours | style.css | `:root` at the top |
| Hero slideshow timing | script.js | `hero photo slideshow`, change the number near the end (milliseconds) |
| Counter speed | script.js | `dur=` |
| Tabs | index.html | `data-tab` (which section belongs to which tab) |

## Phone layout

Phones (screens 860 px wide or less) have their own layout. The phone rules are in blocks starting with `@media (max-width:860px)` and most of them are near the bottom of `style.css`. Laptop rules are in blocks starting with `@media (min-width:861px)` or are written without a media block.

What is different on a phone:
- The green contact bar at the top is hidden (the same details are in the Contact section).
- The white menu bar slides away when you scroll down and comes back when you scroll up. Links sit on one line.
- The hero photo is a banner on top; the tagline and heading sit on it, and the intro paragraph is hidden.
- Numbers strip, vision points, enquiry form fields and the two factory maps keep their two-column or single-row layout.
- Product descriptions are hidden, and the part name sits next to its number.
- On Machines, the table comes first and the photos below it.
- On Customers, logos come first in rows of 3, 3 and 2, then the table.
- The About text shows three lines with a Read more link.

To preview the phone layout on a laptop, make the browser window narrow (under 860 px wide).

## Contact form

The form sends every enquiry to the email address in this line of `index.html`:

```
action="https://formsubmit.co/ajax/sasthaenggservices@yahoo.co.in"
```

One-time activation, after the site is online:
1. Open the live site and send one test enquiry.
2. Check the inbox and spam folder for an email from FormSubmit.
3. Click the activation link.
4. Send another test to confirm it arrives.

If the email address changes, edit that line and activate the new address the same way. Required fields: Name, Company, Email, Part details. Phone is optional.

## Phone and email links

- Tapping the contact person's mobile number dials `+91 98407 79640`.
- Tapping the landline dials `04443111640` (044 4311 1640). This works from within India. For callers from abroad, the international form would be `tel:+914443111640`.

## Maps

Factory 1 and Factory 2 use Google Maps embeds. To change a location, edit the coordinates in the `maps.google.com/maps?q=LAT,LNG` line and the "Open in Google Maps" link for that factory.

## Publish on GitHub and host

1. Upload the project to a GitHub repository (all files at the top level, not inside an extra folder).
2. Connect the repository to Vercel (Add New, Project, Deploy) or Render (New, Static Site, publish directory `.`, no build command).
3. Every time you commit to the `main` branch, the site redeploys automatically.
4. Test the contact form on the live link.

If GitHub says "unable to commit" while editing a file in the browser, the file was changed after you opened the editor. Reload the page, open the file again, paste the new content and commit straight away.

## Checklist before going live

- [ ] All image and logo files added with exact names (including the 10 extra Quality photos and `logo-simpson.png`)
- [ ] About video compressed to a small file
- [ ] Factory 2 pin code checked (map link shows 600058, Contact section shows 600 098)
- [ ] Contact form tested and FormSubmit activated
- [ ] Phone numbers and email checked (tap both numbers on a phone)
- [ ] Tested on a phone and on a laptop