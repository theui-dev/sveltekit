<script lang="ts">
  import { token } from "$lib/utility"
  import { Accordion, AccordionGroup, Alert, Badge, Breadcrumb, Button, ButtonGroup, Collapse, Container, Dropdown, Svg, Modal, Navbar, NavContainer, Notification, notify, Offcanvas, Progress, ToggleTheme, Tooltip, Tabs, TabList, Tab, TabPanel, Popup} from "$lib"
  // import {Editor, Checkbox, Fieldset, Fileinput, Input, Radio, Textarea, Select } from '$lib'
  import { Checkbox, Input, Textarea, Radio, Select, Editor, Fileinput, Form } from '$lib'
  import type { BREADCRUMB_DATA_TYPE, SELECT_DATA_TYPE } from "theui/types"

  let data = [
    {
      url: "https://google.com",
      text: "Google",
    },
    {
      text: "Google",
      type: 'header'
    },
    {
      url: "https://google.com",
      text: "Google",
    },
    {
      type: 'divider'
    },
    {
      active: true,
      url: "https://google.com",
      text: "Facebook",
    },
    {
      url: "https://google.com",
      text: "Google",
    },
  ]

  let bc: BREADCRUMB_DATA_TYPE[] = [
    {
      text: "Home",
      url: "https://google.com",
    },
    {
      text: "About",
      url: "https://google.com",
    },
    {
      text: "Contact"
    },
  ]

  let selectData: SELECT_DATA_TYPE[] = [
    {
      text      : 'Sel 1',
      value     : 1,
    },
    {
      text      : 'Sel 2',
      value     : 2,
      selected  : true
    },
    {
      text      : 'Sel 3',
      value     : 3,
    },
    {
      text      : 'Sel 4',
      value     : 4,
      disabled  : true
    },
    {
      text      : 'Sel 5',
      value     : 5,
    },
  ]

</script>

<svelte:head>
  <title>Svelte App</title>
</svelte:head>

<!-- <Popup>
  Hello Entry
</Popup>

<Popup event="exit">
  Hello Exit
</Popup> -->

<Navbar config={{ animateSpeed: 'slower', scrollBehavior: 'shrinkOnScrollDown', height: 'lg' }}>
  <div class="flex items-center justify-between w-full">
    <a sveltekit:prefetch href="/" class="flex items-center gap-x-4 text-2xl text-default font-semibold select-none">
      <span class="flex items-baseline font-title">theui<sub class="text-gray-500 font-light text-sm">.xyz</sub></span>
    </a>
    <NavContainer>
      <a sveltekit:prefetch class="text-default" href="/">Home</a>
      <a sveltekit:prefetch class="text-default" href="/table">Table</a>
      <a sveltekit:prefetch class="text-default" href="/all">All</a>
      <span class="mx-4 bg-brand/10 dark:bg-gray-700 w-px h-[1em] flex-grow"></span>
      <ToggleTheme />
    </NavContainer>
  </div>
</Navbar>

<Container>
  <p class="py-4"></p>
  <Checkbox name="helloCheck" label="Hello checkbox" helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." size="sm" />
  <p class="py-4"></p>
  <Checkbox name="helloCheck" label="Hello checkbox" helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." size="md" />
  <p class="py-4"></p>
  <Checkbox name="helloCheck" label="Hello checkbox" helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." size="lg" />
  <p class="py-4"></p>
  <Checkbox name="helloCheck" label="Hello checkbox" helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. " size="xl" />
  <p class="py-4"></p>
  <Checkbox name="helloCheck" label="Disabled checkbox" disabled helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. " size="xl" />
  <p class="py-4"></p>

  <Radio name="helloCheck" helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. " label="Hello Radio" size="sm" />
  <p class="py-4"></p>
  <Radio name="helloCheck" label="Hello Radio" helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. " size="md" />
  <p class="py-4"></p>
  <Radio name="helloCheck" disabled helperText="Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. " label="Disabled Radio" size="lg" />
  <p class="py-4"></p>

  <Select name="myselect_1" config={{ variant: 'flat' }}>
    <option value="">Select</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </Select>
  <p class="py-4"></p>
  <Select name="myselect_1" config={{ variant: 'flat' }} data={selectData}/>
  <p class="py-4"></p>

  <Form action="/" size="sm">
    <Input name="fullName" label="Name" disabled="true" value="Hello" />
    <Input name="fullName" label="Name" readonly="true" value="Hello" />
    <Input name="fullName" label="Name" placeholder="Hello text" />
    <Input name="fullName" label="Name" placeholder="Hello text" />
    <Input name="fullName" label="Email" type="email" labelStyle="text-red-500 font-light" />
    <Textarea name="name" label="Hello" placeholder="Enter your message" />
    <h3 class="pt-8 pb-4 font-semibold text-xl">Editor</h3>
    <Editor name="test"/>
    <Fileinput name="myFile" config={{ variant: 'flat'
    // , rounded: 'none' 
    }} />
  </Form>

  
  <Input name="fullName" label="Name" config={{ size: 'lg', variant: 'flat' }} />
  <Input name="fullName" label="Email" type="email" />

  <h3 class="pt-8 pb-4 font-semibold text-xl">Accordion</h3>

    <Accordion isOpen={true} data={{ title: "How to do this?", content: "Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Mauris sollicitudin fermentum libero. Nullam quis ante. Fusce vulputate eleifend sapien. Vivamus in erat ut urna cursus vestibulum." }}/>
    <Accordion data={{ title: "How to do this?", content: "Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Mauris sollicitudin fermentum libero. Nullam quis ante. Fusce vulputate eleifend sapien. Vivamus in erat ut urna cursus vestibulum." }}/>
    <Accordion data={{ title: "How to do this?", content: "Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Mauris sollicitudin fermentum libero. Nullam quis ante. Fusce vulputate eleifend sapien. Vivamus in erat ut urna cursus vestibulum." }}/>

  <AccordionGroup>
    <Accordion config={{variant: 'flush'}} data={{ title: "How to do this?", content: "Praesent egestas neque eu enim. Suspendisse potenti. Cras ultricies mi eu turpis hendrerit fringilla." }}/>
    <Accordion config={{variant: 'flush'}} data={{ title: "How to do this?", content: "Praesent egestas neque eu enim. Suspendisse potenti. Cras ultricies mi eu turpis hendrerit fringilla." }}/>
    <Accordion config={{variant: 'flush'}} data={{ title: "How to do this?", content: "Praesent egestas neque eu enim. Suspendisse potenti. Cras ultricies mi eu turpis hendrerit fringilla." }}/>
  </AccordionGroup>
  <br><br>
  <AccordionGroup>
    <Accordion data={{ title: "How to do this?", content: "Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Mauris sollicitudin fermentum libero. Nullam quis ante. Fusce vulputate eleifend sapien. Vivamus in erat ut urna cursus vestibulum." }}/>
    <Accordion data={{ title: "How to do this?", content: "Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Mauris sollicitudin fermentum libero. Nullam quis ante. Fusce vulputate eleifend sapien. Vivamus in erat ut urna cursus vestibulum." }}/>
    <Accordion data={{ title: "How to do this?", content: "Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Mauris sollicitudin fermentum libero. Nullam quis ante. Fusce vulputate eleifend sapien. Vivamus in erat ut urna cursus vestibulum." }}/>
  </AccordionGroup>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Alert</h3>

  <Svg>
    <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z'/>
  </Svg>

  <Svg viewBox="0 0 24 24" stroke={true} stroke-width="2" size=1.5>
    <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </Svg>

  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>

  <!-- Alert Card -->
  <Alert>Hello</Alert>
  <Alert type="info">Hello</Alert>
  <Alert type="success">Hello</Alert>
  <Alert type="warning">Hello</Alert>

  <!-- Alert CardLight -->
  <Alert variant="cardLight">Hello</Alert>
  <Alert variant="cardLight" type="info">Hello</Alert>
  <Alert variant="cardLight" type="success">Hello</Alert>
  <Alert variant="cardLight" type="warning">Hello</Alert>

  <!-- Alert CardLight -->
  <Alert variant="borderTop">Hello</Alert>
  <Alert variant="borderTop" type="info">Hello</Alert>
  <Alert variant="borderTop" type="success">Hello</Alert>
  <Alert variant="borderTop" type="warning">Hello</Alert>

  <!-- Alert CardLight -->
  <Alert variant="borderBottom">Hello</Alert>
  <Alert variant="borderBottom" type="info">Hello</Alert>
  <Alert variant="borderBottom" type="success">Hello</Alert>
  <Alert variant="borderBottom" type="warning">Hello</Alert>

  <!-- Alert CardLight -->
  <Alert variant="borderStart">Hello</Alert>
  <Alert variant="borderStart" type="info">Hello</Alert>
  <Alert variant="borderStart" type="success">Hello</Alert>
  <Alert variant="borderStart" type="warning">Hello</Alert>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Badge</h3>
  <p class="relative p-2 bg-indigo-50 dark:bg-gray-700 inline-block text-xs">
    Notifications
    <Badge class="bg-green-200" title="Hello badge"/>
  </p>
  <p class="relative p-2 bg-indigo-50 dark:bg-gray-700 inline-block text-xs">
    Notifications
    <Badge text="New" title="Hello badge" circle={true}/>
  </p>
  <p class="relative p-2 bg-indigo-50 dark:bg-gray-700 inline-block text-xs">
    Notifications
    <Badge title="Hello badge" topFixed={true} circle={true}/>
  </p>
  <hr class="my-4">
  <p class="relative p-2 bg-indigo-50 dark:bg-gray-700 inline-block text-2xl">
    Notifications
    <Badge title="Hello badge" round='full' grow={true} />
  </p>
  <p class="relative p-2 bg-indigo-50 dark:bg-gray-700 inline-block text-2xl">
    Notifications
    <Badge text="New" title="Hello badge" grow={true} round='full'/>
  </p>
  <p class="relative p-2 bg-indigo-50 dark:bg-gray-700 inline-block text-2xl">
    Notifications
    <Badge title="Hello badge" topFixed={true}  round='full' grow={true} />
  </p>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Breadcrumb</h3>

  <Breadcrumb data={bc} space="compact" />
  <br>
  <Breadcrumb data={bc} />
  <br>
  <Breadcrumb data={bc} space="large" />
  <br>
  <Breadcrumb data={bc} separator=">" activeColor="text-red-500" />

  <h3 class="pt-8 pb-4 font-semibold text-xl">Buttons</h3>
  <Button a="a" b="b" class="bg-red-500 text-white hover:bg-red-700" label="Default sm" config={{size: 'sm' }} />
  <br>
  <br>
  <Button label="Outline" config={{outline: true }} />
  <Button label="No Hover" config={{ hover:false }} />
  <Button label="Disabled" attr={{ target: '_blank', disabled: true }} />
  <hr class="my-4">
  <Button label="Outline xs" config={{outline: true, size: 'xs' }} />
  <Button label="Outline sm" config={{outline: true, size: 'sm' }} />
  <Button label="Outline md" config={{outline: true, size: 'md' }} />
  <Button label="Outline lg" config={{outline: true, size: 'lg' }} />
  <Button label="Outline xl" config={{outline: true, size: 'xl' }} />
  <hr class="my-4">
  <Button label="Default xs" config={{size: 'xs' }} />
  <Button label="Default md" config={{size: 'md' }} />
  <Button label="Default lg" config={{size: 'lg' }} />
  <Button label="Default xl" config={{size: 'xl' }} />

  <h3 class="pt-8 pb-4 font-semibold text-xl">Button Group</h3>

  <ButtonGroup>
    <Button label="Action" config={{ outline: true }} />
    <Button label="Action" config={{ outline: true }} />
    <Button label="Action" config={{ outline: true, activeClass:true }} />
    <Button label="Action" config={{ outline: true }} />
    <Button label="Action" config={{ outline: true }} />
    <Button label="Action" config={{ outline: true }} />
  </ButtonGroup>

  <hr class="my-4">

  <ButtonGroup>
    <Button class="btn btn-sm" label="Action" config={{ outline : true }} />
    <Button label="Action" config={{ outline : true, classes: "border-red-500 text-red-500", hover: 'hover:bg-red-500 hover:text-white' }} />
    <Button label="Action" config={{ outline : true, classes: "border-red-500", hover: 'hover:bg-red-500 hover:text-white', activeClass:'border-red-500 bg-red-500 text-white' }} />
    <Button label="Action" config={{ outline : true, classes: "border-red-500 text-red-500", hover: 'hover:bg-red-500 hover:text-white' }} />
    <Button label="Action" config={{ outline : true, classes: "border-red-500 text-red-500", hover: 'hover:bg-red-500 hover:text-white' }} />
    <Button label="Action" config={{ outline : true, classes: "border-red-500 text-red-500", hover: 'hover:bg-red-500 hover:text-white' }} attr={{ disabled: true }} />
  </ButtonGroup>

  <hr class="my-4">

  <ButtonGroup>
    <Button label="Action" />
    <Button label="Action" />
    <Button label="Action" config={{ active:true }} />
    <Button label="Action" />
    <Button label="Action" />
    <Button label="Action" />
  </ButtonGroup>

  <hr class="my-4">

  <ButtonGroup>
    <Button label="Action" config={{ classes: 'bg-red-500 text-white border-red-700',hover:'hover:bg-red-700' }} />
    <Button label="Action" config={{ classes: 'bg-red-500 text-white border-red-700',hover:'hover:bg-red-700' }} />
    <Button label="Active" config={{ classes: 'bg-red-500 text-white border-red-700',hover:'hover:bg-red-700', active:'bg-red-700 border-red-700 text-white' }} />
    <Button label="Action" config={{ classes: 'bg-red-500 text-white border-red-700',hover:'hover:bg-red-700' }} />
    <Button label="Action" config={{ classes: 'bg-red-500 text-white border-red-700',hover:'hover:bg-red-700' }} />
    <Button label="Action" config={{ classes: 'bg-red-500 text-white border-red-700',hover:'hover:bg-red-700' }} attr={{ disabled: true }} />
  </ButtonGroup>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Collapse</h3>
  <Collapse id="collapseMe">
    <p slot="title" label="Collapse">COLLAPSE SEPERATE</p>
  </Collapse>
  <Collapse id="collapseMe">
    <div slot="body" class="py-4">
      <p>Vestibulum suscipit nulla quis orci. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>
    </div>
  </Collapse>

  <Collapse label="COLLAPSE">
    <p slot="title" label="Collapse">COLLAPSE</p>
    <div slot="body" class="py-4">
      <p>Sed hendrerit. Nullam dictum felis eu pede mollis pretium. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Maecenas malesuada.</p>
    </div>
  </Collapse>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Dropdown</h3>

  <Dropdown>
    <Button slot="label" label="Dropdown Default (from-bottom)" />
    <div slot="items" let:itemCls>
      <a href="/#" class={itemCls}>
        <Svg name="star" />
        <span class="mr-auto">I am link</span>
        <Badge/>
      </a>
      <Button label="Action" config={{ classes: 'bg-red-500 text-white border-red-700 w-full',hover:'hover:bg-red-700' }} />
    </div>
  </Dropdown>

  <Dropdown items={data} config={{ animation: 'fade', closeOnEsc: false }} >
    <Button slot="label" label="Dropdown Fade" />
  </Dropdown>

  <Dropdown items={data} config={{ animation: 'slide-left', backdrop: true }} >
    <Button slot="label" label="Dropdown left" />
  </Dropdown>

  <Dropdown items={data} config={{ animation: 'slide-down', closeOnOutsideClick: false }} >
    <Button slot="label" label="Dropdown top" />
  </Dropdown>

  <Dropdown items={data} config={{ animation: 'slide-right', alignRight: true }} >
    <Button slot="label" label="Dropdown right" />
  </Dropdown>

  <Dropdown items={data} config={{ animation: 'zoom-in' }} >
    <Button slot="label" label="Dropdown Zoom in" />
  </Dropdown>

  <Dropdown items={data} config={{ animation: 'zoom-out' }} >
    <Button slot="label" label="Dropdown Zoom out" />
  </Dropdown>

  <hr class="my-4">

  <h3 class="pt-8 pb-4 font-semibold text-xl">Form Input</h3>
  <div class="grid grid-cols-2 gap-8 mb-16">
    <div>
      <!-- 
        
         -->
    </div>
    <div>
      <!-- <Fieldset label="My Checkboxes" cls="flex items-center gap-4">
        <Checkbox name="helloCheck" label="Hello Radio" config={{ classes: "text-red-500 focus:ring-red-500 checked:ring-red-500"}} />
        <p class="py-4"></p>
        <Checkbox name="helloCheck" label="Hello Radio" config={{ classes: "text-red-500 focus:ring-red-500 checked:ring-red-500"}} />
        <p class="py-4"></p>
        <Checkbox name="helloCheck" label="Hello Radio" config={{ classes: "text-red-500 focus:ring-red-500 checked:ring-red-500"}} />
      </Fieldset>
      <Fieldset label="My Checkboxes" cls="flex items-center gap-4">
        <Radio name="helloCheck" label="Hello Radio" config={{ classes: "text-red-500 focus:ring-red-500 checked:ring-red-500"}} />
        <p class="py-4"></p>
        <Radio name="helloCheck" label="Hello Radio" config={{ classes: "text-red-500 focus:ring-red-500 checked:ring-red-500"}} />
        <p class="py-4"></p>
        <Radio name="helloCheck" label="Hello Radio" config={{ classes: "text-red-500 focus:ring-red-500 checked:ring-red-500"}} />
      </Fieldset> -->
    </div>
  </div>
  <div class="grid grid-cols-2 gap-8">
    <div>
      <!--
        
      <Select name="mysel1">
        <option value="">Select</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select>
       -->
    </div>
    <div>
      <!-- <Textarea name="name" label="Hello" attr={{ placeholder: "Enter your message", disabled: true }} />
      <Input type="email" name="fullName" label="Enter email" attr={{ placeholder: "Enter your email", disabled: true }} config={{ rounded: 'lg', labelConfig: {color: 'text-red-500'} }} />
      <Input type="email" name="fullName" label="Enter email" attr={{ placeholder: "Enter your email", readonly: true }} config={{ rounded: 'lg', labelConfig: {color: 'text-red-500'} }} />
      <Select name="mysel2" attr={{ placeholder: "Enter your email", readonly: true }}>
        <option value="">Select</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Select> -->
    </div>
  </div>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Modal</h3>
  <Modal id="separateButtonModal">
    <Button slot="modalBtn" label="Modal Separate Button" />
  </Modal>
  <Modal id="separateButtonModal" config={{ size: 'sm', position: 'center' }}>
    <div slot="body">
      Hello From Modal Separate Button
    </div>
  </Modal>

  <Modal config={{ size: 'sm' }} label="Modal SM" let:label let:attr>
    <Button slot="modalBtn" {label} {attr}/>
    <div slot="body">
      Hello From Modal SM
    </div>
  </Modal>

  <Modal config={{ size: 'md' }}>
    <Button slot="modalBtn" label="Modal Default" />
    <div slot="body">
      Hello From Modal Default
    </div>
  </Modal>

  <Modal config={{ size: 'lg' }}>
    <Button slot="modalBtn" label="Modal LG" />
    <svelte:fragment slot="header">
      <h2 class="font-bold text-xl">Hello From Modal LG</h2>
    </svelte:fragment>
    <div slot="body">
      Hello From Modal LG. Cras non dolor. Aenean imperdiet. Vestibulum ante g h j g h j ipsum primis in faucibus orci g h j g h j luctus et g h j g h j ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Praesent vestibulum dapibus nibh. Cras non dolor. Aenean imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Praesent vestibulum dapibus nibh. Cras non dolor. Aenean imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Praesent vestibulum dapibus nibh.
    </div>
    <svelte:fragment slot="footer">
      <div class="flex justify-end gap-4 pt-4">
        <Button label="CANCEL"/>
        <Button label="SUBMIT"/>
      </div>
    </svelte:fragment>
  </Modal>

  <Modal config={{ size: 'full' }}>
    <Button slot="modalBtn" label="Modal Full" />
    <div slot="body">
      Hello From Modal Full
    </div>
  </Modal>

  <Modal config={{ position: 'center' }}>
    <Button slot="modalBtn" label="Modal Center" />
    <div slot="body">
      Hello From Modal Center
    </div>
  </Modal>

  <Modal config={{ position: 'top', animation: 'slide-down' }}>
    <Button slot="modalBtn" label="Modal From Top" />
    <div slot="body">
      Hello From Modal Top
    </div>
  </Modal>

  <Modal config={{ position: 'bottom', animation: 'slide-up' }}>
    <Button slot="modalBtn" label="Modal Bottom" />
    <div slot="body">
      Hello From Modal Bottom
    </div>
  </Modal>

  <Modal config={{ position: 'center', animation: 'zoom-in' }}>
    <Button slot="modalBtn" label="Modal Zoom In" />
    <div slot="body">
      Hello From Modal Zoom In Anim
    </div>
  </Modal>

  <Modal config={{ position: 'center', animation: 'zoom-out' }}>
    <Button slot="modalBtn" label="Modal Zoom Out" />
    <div slot="body">
      Hello From Modal Zoom Out Anim
    </div>
  </Modal>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Notification</h3>
  <Button label="Notification" on:click={()=>notify('Hello World 1')}/>
  <Button label="Notification Theme" on:click={()=>notify('Hello World 2', 'success', {theme: 'bg-white text-inherit'})}/>
  <Button label="Notification info" on:click={()=>notify('Hello World 3', 'info', {id:"myNotifyID"})}/>
  <Button label="Notification warning" on:click={()=>notify('Hello World 4', 'warning')}/>
  <Notification />

  <h3 class="pt-8 pb-4 font-semibold text-xl">Offcanvas</h3>
  <Offcanvas>
    <Button slot="button" label="Offcanvas Default (Left)"/>
    <div slot="body">Hello Default (Left) offcanvas</div>
  </Offcanvas>
  <Offcanvas config={{ position: 'right', staticBackdrop: true }}>
    <Button slot="button" label="Offcanvas Right"/>
    <div slot="body">Hello Right offcanvas</div>
  </Offcanvas>
  <Offcanvas config={{ position: 'top' }}>
    <Button slot="button" label="Offcanvas Top"/>
    <div slot="body">Hello Top offcanvas</div>
  </Offcanvas>
  <Offcanvas config={{ position: 'bottom' }}>
    <Button slot="button" label="Offcanvas Bottom"/>
    <div slot="body">Hello Bottom offcanvas</div>
  </Offcanvas>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Progress</h3>
  <Progress /><br>
  <Progress config={{ height: 'sm' }} /><br>
  <Progress config={{ height: 'md' }} /><br>
  <Progress config={{ height: 'lg' }} /><br>
  <Progress config={{ height: 'xl' }} /><br>
  <Progress label="50%" config={{ height: 'sm' }} /><br>
  <Progress label="50%"/><br>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Tabs</h3>

  <Tabs type="tabs">
    <TabList>
      <Tab>Hello 1</Tab>
      <Tab>Hello 2</Tab>
      <Tab>Hello 3</Tab>
    </TabList>
    <TabPanel>
      Ut varius tincidunt libero. Etiam ultricies nisi vel augue. Pellentesque auctor neque nec urna.
    </TabPanel>
    <TabPanel>
      Nullam sagittis. Phasellus ullamcorper ipsum rutrum nunc. Fusce fermentum. Nullam sagittis. Phasellus ullamcorper ipsum rutrum nunc. Fusce fermentum.
    </TabPanel>
    <TabPanel>
      Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Cras id dui. Duis leo.
      Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Cras id dui. Duis leo.
    </TabPanel>
  </Tabs>

  <h3 class="pt-8 pb-4 font-semibold text-xl">Tooltip</h3>

  <Tooltip class="text-yellow-400 p-3" text="Hello <u>tooltip Hello tooltip</u>" config={{ position: "right" }}><Button label="Hover me R Hover me R Hover me R" /></Tooltip>
  <Tooltip text="Hello tooltip" config={{ position: "left" }}><Button label="Hover me L" /></Tooltip>
  <br>
  <Tooltip text="Hello tooltip"><Button label="Hover me T" /></Tooltip>
  <Tooltip text="Hello tooltip" config={{ position: "bottom" }}><Button label="Hover me B" /></Tooltip>

</Container>