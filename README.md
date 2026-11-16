# Sastha Engineering Website

Static website (HTML, CSS, JavaScript). No build step and no backend. Works on laptop and phone.

## Folder structure

```
Sastha-Engineering-Website/
  index.html      page content (text, addresses, contact form, page sections)
  style.css       all design and colours (phone layout is the last block, see "Phone layout")
  script.js       data lists, pages, menus, photo sliders, image viewer, customers strip, contact form
  README.md       this file
  images/         all photos, logos and the About video
```

Keep these files together. File names are case-sensitive on web hosts, so use lowercase exactly as listed below.

## Run it on your computer

1. Keep `index.html`, `style.css`, `script.js` and the `images` folder in one folder.
2. Double-click `index.html`.
3. After editing, save and press Ctrl+F5 in the browser to reload without the cache.

Fonts (Barlow Condensed, IBM Plex Sans) need internet. Without it, Arial is used.

## Pages

Only one page shows at a time. The menu is: Home, Products, Machines, Quality, Organisation, Customers, Contact.

- **Home**: hero photo slideshow, numbers strip, About the company (video and text), Our vision. The hero has two buttons: Contact Us and View Machines.
- **Products**: two categories, each with a photo grid and the part name under each photo.
  - Tractor / Farm Equipment: Bonnet Lock, Drive Roller, Pipe and Pin, Banjos and Fittings
  - Automotive: Pulley Tensioner, Drain Plug
- **Machines**: one machine at a time, chosen from the Machines menu. Shows the title, a short description, capacity and quantity, and a slider of up to 3 photos (two at a time on a laptop). CNC lathe (23 Nos.) and Sliding head stock (12 Nos.) are separate machines.
- **View Machines** (the button on Home, not in the menu): shop floor photos and the **List of machines** table (every machine with its quantity). The table is built from the machine list in `script.js`.
- **Quality**: the Machines group (6 inspection machines) and the Equipment group (7 instruments), chosen from the Quality menu. Each item shows its name and its photos.
- **Organisation**: the organisation chart (MD, Production, Quality, Accountant).
- **Customers**: customer logos, then the table of parts supplied. The sliding logo strip is hidden on this page and shown on every other page.
- **Contact** (details, enquiry form, both maps) and the **Request a Quote** button are on every page.

The Back and Forward buttons of the browser move between pages and keep the selected machine, product category and quality group.

## Menus

- **Laptop**: Products, Machines and Quality open a dropdown on hover. Clicking the word "Products" shows both product categories together.
  - Products dropdown: the two categories only.
  - Machines dropdown: the 9 machines (CNC lathe, Sliding head stock, Vertical machining centre, Centreless grinding, Capstan lathe, Auto lathe Traub, Thread rolling, Milling machine, Drilling and tapping).
  - Quality dropdown: Machines and Equipment.
- The item you picked stays highlighted in the dropdown, so it is still marked when you come back to it.
- **Phone**: the hamburger button opens a side menu with the same groups. It opens with the group of the current page expanded and your last choice highlighted.

## Photo viewer and video

- Click (laptop) or tap (phone) any photo on Products, Machines, View Machines or Quality to open it full screen.
- Use the ‹ and › buttons, swipe left or right, or press the arrow keys to move to the next photo. Close with the × button, by clicking the dark area, or with Esc. A counter such as "2 / 3" shows the position.
- The About video plays silently on a loop. Click or tap it to open a full-screen player with controls.
- The big shop floor photo shows "Click to expand" (laptop) or "Tap to expand" (phone).

## Images (put all in the `images` folder)

A missing photo shows a dashed placeholder with its file name, so you can see what to add. Missing files also show as `ERR_FILE_NOT_FOUND` in the browser console, which is harmless.

Tips: JPG for photos, PNG with transparent background for logos, 1600 x 1200 px (4:3) for product, machine and inspection photos, 1920 x 1000 px for the hero. Use customer logos only with their permission.

**Photo shape:** every product, machine and inspection photo is shown in the same 4:3 frame, and the photo fills the frame edge to edge with no empty space. A photo that is exactly 4:3 (for example 1600 x 1200 px) shows in full. Any other shape is trimmed slightly at the edges, so keep the part in the middle of the photo. The frames are large: on a laptop about 650 px wide on Machines and Quality and 550 px wide on Products. To use another shape for all of them, change `imageRatio` in `CONFIG` at the top of `script.js` (for example `'3 / 2'`).

### General

| Filename | Where it appears |
|---|---|
| hero.jpg | Hero photo, first (Factory 1) |
| hero-2.jpg | Hero photo, second (Factory 2). The slideshow alternates between the two |
| about.mp4 | About video (MP4, H.264). See the note on size below |
| machine-shop-1.jpg to machine-shop-3.jpg | View Machines, shop floor (1 is the big photo) |
| logo-sastha.png | Menu logo and browser tab icon |
| logo-sundram.png | Sundram Fasteners |
| logo-sdf.png | Same Deutz Fahr |
| logo-mitsuba.png | Mitsuba India |
| logo-auto-ignition.png | Auto Ignition |
| logo-prabha.png | Prabha Engineering |
| logo-simpson.png | Simpson |
| logo-motion.png | Motion Industries |
| logo-apa.png | APA Engineering |

**Video size:** a large video loads slowly on mobile data. Compress it to 720p, about 2 Mbps (roughly 3 to 8 MB for a 30 second clip) before uploading.

### Products

| Product | Photo |
|---|---|
| Bonnet Lock | bonnet-assembly.jpg |
| Drive Roller | product-drive-roller.jpg |
| Pipe and Pin | product-pipe-and-pin.jpg |
| Banjos and Fittings | product-banjos-and-fittings.jpg |
| Pulley Tensioner | pulley-assembly.jpg |
| Drain Plug | product-drain-plug.jpg |

### Machines

Each machine uses three photos: `machine-<name>-1.jpg`, `-2.jpg` and `-3.jpg`. Photos 1 and 2 are expected (a placeholder shows if they are missing). Photo 3 is skipped if it does not exist.

| Machine | File name starts with |
|---|---|
| CNC lathe | machine-cnc-lathe- |
| Sliding head stock | machine-sliding-head-stock- |
| Vertical machining centre | machine-vertical-machining-centre- |
| Centreless grinding | machine-centreless-grinding- |
| Capstan lathe | machine-capstan-lathe- |
| Auto lathe Traub | machine-auto-lathe- |
| Thread rolling | machine-thread-rolling- |
| Milling machine | machine-milling-machine- |
| Drilling and tapping | machine-drilling-and-tapping- |

Example: `machine-cnc-lathe-1.jpg`, `machine-cnc-lathe-2.jpg`, `machine-cnc-lathe-3.jpg`.

### Quality

Each item uses `<name>.jpg` as the first photo, plus optional `<name>-2.jpg` and `<name>-3.jpg`. Only the first photo is needed.

**Machines group**

| Item | First photo |
|---|---|
| Profile Projector | inspection-profile-projector.jpg |
| Video Measurement System | inspection-2.jpg |
| Thermo 2D Height Gauge | inspection-3.jpg |
| Roughness Tester | inspection-roughness-tester.jpg |
| Height Gauge | inspection-height-gauge.jpg |
| CMM (Coordinate Measuring Machine) | inspection-1.jpg |

**Equipment group**

| Item | First photo |
|---|---|
| Air Gauge | inspection-air-gauge.jpg |
| Slip Gauges | inspection-slip-gauges.jpg |
| Bore Dial Gauges | inspection-bore-dial-gauges.jpg |
| Pitch Micrometer | inspection-pitch-micrometer.jpg |
| Refractometer | inspection-refractometer.jpg |
| Digital Micrometer | inspection-digital-micrometer.jpg |
| Digital Vernier Caliper | inspection-digital-vernier.jpg |

Extra photos follow the same pattern, for example `inspection-air-gauge-2.jpg` and `inspection-air-gauge-3.jpg`. For `inspection-1`, `inspection-2` and `inspection-3` the extras are `inspection-1-2.jpg`, `inspection-1-3.jpg` and so on.

On the Quality page each item shows one photo at a time (swipe or use the arrows for the others), and every frame is 4:3.

### Old files you can delete

`about.jpg`, `bonnet-child.jpg`, `pulley-child.jpg`, `valve-child.jpg`, `valve-assembly.jpg` and `product-1.jpg` to `product-4.jpg` are no longer used by the site.

## What to edit and where

Most content lives in the **DATA block at the top of `script.js`**. Edit it and the pages, menus, phone side menu and tables all update together.

| To change | Open | Look for |
|---|---|---|
| Products and categories | script.js | `var PRODUCTS` |
| Machines (names, description, capacity, quantity) | script.js | `var MACHINES` |
| Inspection machines and equipment | script.js | `var QUALITY` |
| Customers, logos, parts supplied (also the table and strip) | script.js | `var CUSTOMERS` |
| Hero slideshow photos | script.js | `heroSlides` in `CONFIG` |
| Speed of the customers strip | script.js | `stripDelay` in `CONFIG` |
| Shape of all product, machine and inspection photos | script.js | `imageRatio` in `CONFIG` (default `'4 / 3'`) |
| Show pickers (machine dropdown, chips) | script.js | `showSelectors` in `CONFIG` (false by default) |
| Text, phone, email, addresses | index.html | the text itself |
| Numbers strip (employees, turnover) | index.html | `data-to` |
| Hero tagline on phone | index.html | `hero-cap` |
| Organisation chart | index.html | `org-tree` |
| Colours | style.css | `:root` at the top |

Notes:
- `MACHINES` entries are: image name, menu label, page title, description, capacity, quantity. Use `null` for capacity if there is none (Sliding head stock has none at present). Add `'fit'` as a 7th item to make that machine's frames follow each photo's own shape instead of 4:3, so a tall or odd-shaped photo is never cropped (used for Auto lathe Traub). To remove a machine, delete its line; the menu, page and List of machines table update together.
- `CUSTOMERS` entries with `parts: null` appear as a logo only, with no table row. Table rows and logos follow the order of the list.
- Titles of machines and inspection items always stay on one line. The text shrinks a little if a title is long.

## Phone layout

Phones (screens 860 px wide or less) have their own layout. The rules are in the block starting with `@media (max-width:860px)` at the bottom of `style.css`. A smaller block for screens up to 1100 px comes just before it. Laptop rules are written without a media block.

What is different on a phone:
- The green contact bar at the top is hidden. A small bar with Home, About us and Contact us stays at the top.
- The menu bar slides away when you scroll down and comes back when you scroll up. The hamburger button opens the side menu.
- The hero photo is a banner. "Precision turned parts since 1995" sits on the bottom of the photo in white. The heading and intro paragraph are hidden.
- About the company is hidden until About us is tapped. It shows the video first and three lines of text with a Read more link.
- The numbers strip is one row of four. Vision points are in two columns.
- Products show one photo per row (two per row on a laptop), 4:3.
- Machine descriptions are hidden. Machine photos show one at a time, 4:3, almost the full width of the screen.
- Quality shows one item per row, one photo per frame. Swipe or use the arrows for the item's other photos.
- The big shop floor photo shows in full at the width of the screen.
- Customers logos are three per row. Each logo box grows to fit its logo.
- The customers strip shows two logos at a time.

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

If the email address changes, edit that line and activate the new address the same way. Required fields: Name, Company, Phone, Part details. Email is optional.

## Phone and email links

- Tapping the contact person's mobile number dials `+91 98407 79640`.
- Tapping the landline dials `04443111640` (044 4311 1640). This works from within India. For callers from abroad, the international form would be `tel:+914443111640`.

## Addresses

- Unit 1: No. 180/1A, 7th Street, SIDCO Industrial Estate, North Phase, Ambattur, Chennai 600 098
- Unit 2: 26B/3B, 5th Street, SIDCO Industrial Estate, North Phase, Ambattur, Chennai 600 098

To change them, edit the `address` lines in the Contact section of `index.html`.

## Maps

Factory 1 and Factory 2 use Google Maps embeds. To change a location, edit the coordinates in the `maps.google.com/maps?q=LAT,LNG` line and the "Open in Google Maps" link for that factory.

## Publish on GitHub and host

1. Upload the project to a GitHub repository (all files at the top level, not inside an extra folder).
2. Connect the repository to Vercel (Add New, Project, Deploy) or Render (New, Static Site, publish directory `.`, no build command).
3. Every time you commit to the `main` branch, the site redeploys automatically.
4. Test the contact form on the live link.

If GitHub says "unable to commit" while editing a file in the browser, the file was changed after you opened the editor. Reload the page, open the file again, paste the new content and commit straight away.

## Checklist before going live

- [ ] All photos and logos added with the exact file names above (products, machines, quality, shop floor, logos)
- [ ] About video compressed to a small file
- [ ] Factory 2 pin code checked (the map link and the Contact section should show the same code)
- [ ] Contact form tested and FormSubmit activated
- [ ] Phone numbers and email checked (tap both numbers on a phone)
- [ ] Tested on a phone and on a laptop
