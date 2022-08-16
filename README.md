# Sveltekit Components

The **@theui/sveltekit-components** is an official component library of [**The UI**](https://www.theui.xyz) for **Sveltekit** designed on the top of TailwindCSS. The components are highly accessible and customizable out of the box.
<br><br>
### Features
 * Accessible components
 * Dark/light mode control
 * Theming and branding just with a single line CSS
 * Highly customizable
 * RTL supports (Coming soon)
 * Works with any design system (Coming soon, currently works with  only TailwindCSS v3.1.x)
 * Fully typed
<br><br>
### Components
 * Accordion
 * Alert
 * Badge
 * Breadcrumb
 * Button
 * Button group
 * Collapse
 * Container
 * Dark-mode toggle
 * Dropdown
 * Form
 * Icon
 * Modal
 * Navbar
 * Notification
 * Offcanvas
 * Popup (Exit and Entry popup)
 * Progress bar
 * Tabs and pills
 * Table
 * Tooltip
<br><br>
### Installation Guide
Follow the following steps to install the library:
#### **1. Install Sveltekit**
Install Sveltekit before anything with the following commands:
```bash
npm init svelte my-app
cd my-app
npm install
```
#### **2. Add Tailwind CSS to your project**
Add Tailwind CSS to your Sveltekit project with the following command:
```bash
npx svelte-add@latest tailwindcss
```
#### **3. Add TheUI Components library**
> Run the command to install the Components library:
```sh
npm i @theui/sveltekit-components
```
> Update TailwindCSS configuration file `tailwind.config.cjs`:

```js
// 1. Update config.content
// 2. Add config.presets
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/@theui/sveltekit-components/**/*.{html,js,svelte,ts}", // New line
  ],
  presets: [require("@theui/core/preset.cjs")], // New line
  darkMode: 'class',
  theme: {
    extend: {},
  },

  plugins: [],
};

module.exports = config;
```
Open `__layout.svelte` and modify it according to the code below:
```html
<script>
  import '../../node_modules/@theui/core/style.postcss' // New line
  import "../app.css"
</script>
```

And thats all. You are ready to start your awesome project now.
<br><br>
### How to use
After installation, you can use any components from the library like bellow:

```html
<script>
// Import the components
import { Button, Input } from "@theui/sveltekit-components"
</script>

<!-- Use the components -->
<Input label="FULL NAME" name="fullName" />
<Button label="Click Me" />
```
For complete documentation, please visit [TheUI: Sveltekit Components Docs](https://www.theui.xyz/docs/sveltekit-components).

<br>

### Branding and Theming
At first, convert your brand color to RGB value if required. Let, your brand color is **rgb(255, 0, 0)**. Now, open the `app.css` or `app.postcss` (the file which contains your TailwindCSS styles) file and add the following line:
```css
--ui-brand: 255 0 0; /* R, G, B */
```
Congratulations! Your new brand color has been applied to all the components.

Not only the brand color. There are some other color options that you can configure according to your project requirements. All the available colors vars are given below.

```css
/* Colors vars with default colors are given here.
You can change any color code according your
expectation. To configure any value for dark mode,
Just change the color value in the :root.dark{} block */

@layer base{
  :root {
    --ui-brand                    : 80 70 230;    /* #5046E6 */
    --ui-brand-active             : 67 56 202;    /* #4338CA */
    --ui-brand-secondary          : 253 230 138;  /* #FDE68A */
    --ui-brand-secondary-active   : 252 211 77;   /* #FCD34D */

    --ui-text-on-brand            : 255 255 255;  /* #FFFFFF */
    --ui-text-on-brand-secondary  : 8 8 24;       /* #080818 */
    --ui-text-default             : 8 8 24;       /* #080818 */

    --ui-bg-primary               : 255 255 255;  /* #FFFFFF */
    --ui-bg-secondary             : 243 244 246;  /* #F3F4F6 */
    --ui-bg-tertiary              : 229 231 235;  /* #E5E7EB */

    --max-width                   : 1320px;
  }
  :root.dark {
    --ui-text-default     : 229 231 235;  /* #E5E7EB */

    --ui-bg-primary       : 8 8 24;       /* #080818 */
    --ui-bg-secondary     : 22 22 38;     /* #161626 */
    --ui-bg-tertiary      : 32 32 48;     /* #202030 */
  }
}
```
> Instead of writing the RGB code **rgb(255, 255, 266)**, why should I write the code in this way? Because, this is how TailwindCSS works to apply opacity with any color.
<br><br>

### Creator and Contributors
##### Creator: **M B Parvez** >> [www.mbparvez.me](https://www.mbparvez.me) | [Github](https://github.com/mbparvezme) | [Linkedin](https://linkedin.com/in/mbparvezme)
<br>

### Special Thanks
* To [Gosoft.io](https://www.gosoft.io) for managing the hosting
* [BIPBY Digital](https://www.bipby.digital) for being our digital partner
<br><br>
### Copyright and license
Code and documentation copyright 2022 the [M B Parvez](https://www.mbparvez.me), [Gosoft](https://www.gosoft.io) and [TheUI](https://www.theui.xyz). Code released under the MIT License. Docs released under [Creative Commons](https://creativecommons.org/licenses/by/3.0/).
