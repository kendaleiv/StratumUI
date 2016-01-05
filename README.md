# StratumUI

A SASS UI framework for rapid Web, App and SPA development. Developed by Ritter Insurance Marketing Software Development, [RIMdev](http://rimdev.io), under the MIT lisence.

## Installation

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
  tablet:      991px,
  desktop:     1200px
  );

```

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

### Helper classes

Here's where we turn more to OOCSS. It's just easier to string together these modifiers right in your html. Some are more complex than the example below; for more on helper classes, refer to `_helpers.scss`.

```html
<h1 class="text-center no-padding right">
```

