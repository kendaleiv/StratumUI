# StratumUI

[WIP]

A SASS UI framework for rapid Web, App and SPA development. Developed by Ritter Insurance Marketing Software Development, [RIMdev](http://rimdev.io), under the MIT license.

Developed to play nicely with [Font Awesome](https://fortawesome.github.io/Font-Awesome/) :) Just include the following line in the `<head>	` of your document.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
```
## Installation

1. Fork [StratumUI](https://github.com/ritterim/StratumUI)
2. Clone [StratumUI](https://github.com/ritterim/StratumUI) locally
2. Run `npm install`
3. Run `gulp`

> TODO: Create npm package for Node distribution

## Organization

### Naming convention

Ok, we're a hybrid between [OOCSS](http://oocss.org) and [BEM](http://bem.info) (Block, element, modifier). A double-dash `--` separates a block from an element, where a single dash `-` separates a block, or `block--element` from a modifier. Sorry, no underscores here for BEM fans.

This applies to classes and vars.

Usage | Examples
---|---
`[block]` | `.card``$padding`
`[block]-[modifier]` | `$grey-dark`
`[block]--[element]` | `.card--title` `$font--family`
`[block]--[element]-[modifier]` | `$font--headline-weight`


### File Structure

Simply put, if it's a new section, it's a new file. Most files will be partials, beginning with an underscore, then included in either the main or mixins manifest. Partials will only be compiled when included in a manifest. All non-partials, sass files without the preceding underscore, will be compiled.

```js
scss/
  | mixins/
  |  | _mixins.scss
  |  | _extends.scss
  |  | _variables.scss
  |  | _buttons.scss     <-- button mixins
  | _mixins.scss         <-- main mixins manifest
  | _elements.scss
  | _buttons.scss        <-- button styles
  | _cards.scss
  | main.scss            <-- main sass manifest
```

### Mixins and extends

Mixins are separated into a mixins folder and called via the mixins manifest.

Mixins specific to a partial are placed in a mixin partial of the same name. A mixin used to create a button would live in `mixins/_buttons.scss`, all cooresponding styles will be in `_buttons.scss`.

**Do not** use a mixin if no argument is passed - **this is an extend**.

## Grid

The default grid is 12 columns (which you can change in `mixins/_variables.scss`). Column widths are generated based on `.container` width.

Container widths are generated based on pre-defined breakpoints (`mixins/_breakpoints.scss`). The default tablet breakpoint triggers 100% column widths for mobile.

```js
// smallest to largest
$breakpoints: (
  phone:       480px,
  phablet:     765px,
  desktop:     1200px
  );

```

## Layout

### Columns

Column structure is similar to bootstrap; the main reasoning is to easily transition a team using BS into this lighter SASS framework.

#### Usage

```html
<!--  3 column layout -->
<div class="row">
  <div class="col-4">
    <h2>H2</h2>
    <p> Content. </p>
  </div>
  <div class="col-4">
    <h2>H2</h2>
    <p> Content. </p>
  </div>
  <div class="col-4">
    <h2>H2</h2>
    <p> Content. </p>
  </div>
</div>

<!--  4 column layout -->
<div class="row">
  <div class="col-3">
    <h3>H3</h3>
    <p> Content. </p>
  </div>
  <div class="col-3">
    <h3>H3</h3>
    <p> Content. </p>
  </div>
  <div class="col-3">
    <h3>H3</h3>
    <p> Content. </p>
  </div>
  <div class="col-3">
    <h3>H3</h3>
    <p> Content. </p>
  </div>
</div>
```

### Tables

Tables are straight-forward, and have several helper classes to modify their look, layout, and readability. See [demos/tables](/demos/tables.html) for live examples.

#### Usage

```html
<table>
  <tr>
    <th>First name</th>
    <th>Last name</th>
    <th>Bio</th>
  </tr>
  <tr>
    <td>Hank</td>
    <td>Venture</td>
    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
  </tr>
  <tr>
    <td>Dean</td>
    <td>Venture</td>
    <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
  </tr>
</table>
```

Type | Usage | Behaviour
---|---|---
inner borders | `table class="inner-borders"` |
even | `table class="even"` | background color on all even rows
odd | `table class="odd"` | background color on all odd rows
text-top | `table class="text-top"`| vertical-align all text to top of cell

## Cards

Cards are the building blocks of our system's dashboard views.

Card dimensions are based on the breakpoint of their container. Four (4) cards across a standard desktop layout will derive their width from `$breakpoint / $card-count`. `$breakpoint` will directly affect `$card-count` as they scale.

### Usage

```html
  <div class="card">
  	...
  </div>
```

 Type | Usage | Behaviour
---|---|---
standard card | `class="card"` | Static
double horizontal | `class="card double horizontal"` | Re-flows surrounding cards
double vertical | `class="card double vertical"`| Floats left
double vertical right | `class="card double vertical right"`| Floats right

> `vertical` **can only be placed left or right within the parent layout.**

### Content

Card content elements are `--title`, `--body` and `--bar`. Long content will scroll within the `--body` element. The `--bar` element allows quick section access for the user and should be included when the dashboard item has it's own section within the app.

> Using a double-width Card? Don't forget to add `double` class: `card--bar double`

```html
  <div class="card">
    <div class="card--title">
      Headline
    </div>
    <div class="card--body">
      Content.
    </div>
    <div class="card--bar">
      View more
      <i class="fa fa-chevron-right"></li>
    </div>
  </div>
```

### Inline images

Block image elements, or an image to span the width of a `card`, are handled within the `card--body`.

Wrap the image tag in a `card--image` container. This will proportionally constrain the image within the containing div.

```html
<div class="card--body">
  <div class="card--image">
  	<img src="/path/to/image">
  </div>
</div>
```

### Responsive

Cards give you the ability to create double-vertical and double-horizontal cards. Only a uniform card set would collapse easily as you scale down. So what happens?

Breakpoint | Double-card | Result
---|---|---
Desktop | default | default
Tablet | vertical (left) | floats right
Phablet | horizontal | single card width
Phone | all | single width  	

## Wings

StratumUI has a relatively narrow desktop width (1200px by default). This is because of Wings.

Wings are what happens > the desktop range. Wings are reserved for content only visible on larger screens. Why? Wings are where you can target test features, ad driven content, or just to create a better experience for the space that's usually blank on large screens. **Wings were developed for use with Cards.**

Place wings directly after `.container` and before any `.card`. The right wing must use the `.right` helper class. Both left and right wings must be used together.

```html
    <div class="container">

      <div class="wing">
      	 ...
      </div><!-- /.wing -->

      <div class="wing right">
      	 ...
      </div><!-- /.wing -->

      <div class="card">
      	 ...
      </div><!-- /.card -->

		...

	</div><!-- /.container -->
```

## Helper classes

Here's where we turn more to OOCSS. It's just easier to string together these modifiers right in your html. Some are more complex than the example below; for more on helper classes, refer to `_helpers.scss`.

```html
<h1 class="text-center no-padding right">
```
