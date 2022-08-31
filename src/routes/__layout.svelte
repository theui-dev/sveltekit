<script>
  import { ToggleTheme, Navbar, NavCollapse, NavDropdown, NavBrand, NavLink, NavContainer, NavToggle } from '$lib'
  import "../app.postcss";
  import "../../node_modules/@theui/core/style.postcss";
</script>

<Navbar config={{ scrollBehavior: 'hideOnScrollDown'}} >
  <NavBrand href="/">
    <span class="flex items-baseline font-title font-bold">theui<sub class="text-gray-500 font-normal text-sm">.xyz</sub></span>
  </NavBrand>

  <NavCollapse>
    <NavContainer>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/all">All</NavLink>
      <NavLink href="/table">Table</NavLink>
      <NavDropdown label="Dropdown left">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
      </NavDropdown>
      <NavDropdown label="Dropdown right" align="right" animation="slide-up">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
      </NavDropdown>
      <NavDropdown label="Dropdown fade" align="right" animation='fade'>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/all">All</NavLink>
        <NavLink href="/table">Table</NavLink>
      </NavDropdown>
    </NavContainer>

    <NavContainer align="right">
      <NavLink href="/">About</NavLink>
      <NavLink href="/all">Contact</NavLink>
      <NavLink href="/table">Support</NavLink>
    </NavContainer>
  </NavCollapse>

  <div class="flex items-center transition-none">
    <ToggleTheme />
    <NavToggle />
  </div>

  <!-- <span class="mx-4 bg-brand/10 dark:bg-gray-700 w-px h-[1em] flex-grow inline-block ml-auto"></span>
  <ToggleTheme /> -->
</Navbar>


<slot />
