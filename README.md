# RitterUI

A SASS UI framework for rapid Web App and SPA development.

## Installation

> TODO: Create npm package for Node distribution

## Organization

### Naming convention

Simple objects, or objects with limited properties are separated with a dash `-`. Objects with multiple properties are separated from their properties with a double-dash. A single dash then separates long property names.

This applies to classes and variables.

Usage | Examples
---|---
`[object]` | `.card``$padding`
`[object]-[property]` | `$grey-dark`
`[object]--[property]` | `.card--title` `$font--family`
`[object]--[long]-[property]` | `$font--headline-weight`

### File Structure

Simply put, if it's a new section, it's a new file. Most files will be partials, beginning with an underscore, then included in the main manifest. Partials will only be compiled when included in a manifest, usually `main.scss`. All non-partials, sass files without the preceding underscore, will be compiled.

```
scss/
  | mixins/
  |  | _mixins.scss
  |  | _helpers.scss
  |  | _messages.scss
  | main.scss
```

### mixins and extends

**Do not** use a mixin if no argument is passed - **this is an extend**.

Globally shared mixins and extends are located in the `mixins` folder. E.g., `square($size)` & `%clearfix`.

Mixins, extends and variables specific to a partial are placed at the beginning of that partial. E.g., a mixin used to create a button would live in `_buttons.scss`, not the main `_mixins.scss` file.

## Cards

Cards are the building blocks of our system's dashboard views.

Card dimensions are based on the breakpoint of their container. Four (4) cards across a standard layout will derive their width from `$breakpoint / $card-count`. `$breakpoint` will directly affect `$card-count` as they scale responsivley.

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

Card content is broken into `--title`, `--body` and `--bar` containers. Long content will scroll within the `card--body` container. The `--bar` container allows quick section access for the user and should always be included.

> Using a double-width Card? Don't forget to add `double` class to `card--bar`

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

Block level images, or an image to span the width of a `card`, are handled within the `card-body`.

Wrap the image tag in a `card--image` container. This will proportionally constrain the image within the containing div.

```html
<div class="card--body">
  <div class="card--image">
  	<img src="/path/to/image">
  </div>
</div>
```
