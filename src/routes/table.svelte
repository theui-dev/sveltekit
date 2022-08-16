<script>
  import { Table, TableHead, TableBody, TableRow, TableCell } from '$lib'

  let headers = ['product', 'category', 'price']
    let keys = ['items', 'category', 'price']
    let data = [
      { items : 'iPhone 11', category : 'Smart phone', price: '$1234' },
      { items : 'Asus K401UQ', category : 'Laptop', price: '$1234' },
      { items : 'Microsoft Surface Pro', category : 'Laptop', price: '$2000' }
    ]
</script>

<div class="px-24 pb-24">
  <h4 class="pt-24 pb-8">Structured Data by Table</h4>
  <Table {headers} {data} {keys} config={{ border: 'x' }} />

  <h4 class="pt-24 pb-8">Structured Data by Thead and Tbody</h4>
  <Table>
    <TableHead {headers}/>
    <TableBody {data} {keys} />
  </Table>

  <h4 class="pt-24 pb-8">Structured Data by TableRow</h4>
  <Table>
    <TableHead>
      <TableRow data={headers} headingRow={true} />
    </TableHead>
    <TableBody>
      <TableRow data={data[0]} {keys} />
      <TableRow data={data[1]} {keys} />
      <TableRow data={data[2]} {keys} />
    </TableBody>
  </Table>

  <h4 class="pt-24 pb-8">Structured Data by TableCell</h4>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell data={headers} headingCell={true} />
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell data={data[0]} {keys} />
      </TableRow>
      <TableRow>
        <TableCell data={data[1]} {keys} />
      </TableRow>
      <TableRow>
        <TableCell data={data[2]} {keys} />
      </TableRow>
    </TableBody>
  </Table>

  <h4 class="pt-24 pb-8">Non data dable</h4>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell headingCell={true}>{headers[0]}</TableCell>
        <TableCell headingCell={true}>{headers[1]}</TableCell>
        <TableCell headingCell={true}>{headers[2]}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>{data[0][keys[0]]}</TableCell>
        <TableCell>{data[0][keys[1]]}</TableCell>
        <TableCell>{data[0][keys[2]]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{data[1][keys[0]]}</TableCell>
        <TableCell>{data[1][keys[1]]}</TableCell>
        <TableCell>{data[1][keys[2]]}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{data[2][keys[0]]}</TableCell>
        <TableCell>{data[2][keys[1]]}</TableCell>
        <TableCell>outline === true ?
          border-brand text-brand hover:bg-brand-active hover:border-brand-active hover:text-on-brand :
          bg-brand border-brand text-on-brand hover:bg-brand-active hover:border-brand-active hover:text-on-brand</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>
