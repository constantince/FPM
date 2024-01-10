"use client"
export default function ClientTable({products}) {
    return   <div className="w-full">
    <table className="table-auto w-full">
      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
        <tr>
          <th className="p-2 whitespace-nowrap">
            <div className="font-semibold text-left">Name</div>
          </th>
          <th className="p-2 whitespace-nowrap">
            <div className="font-semibold text-left">Status</div>
          </th>
          <th className="p-2 whitespace-nowrap">
            <div className="font-semibold text-left">Want</div>
          </th>
          <th className="p-2 whitespace-nowrap">
            <div className="font-semibold text-center">Control</div>
          </th>
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-gray-100">
      {products.map(item => (<tr key={item.name}>
          <td className="p-2 whitespace-nowrap">
            <div className="flex items-center">

              <div className="font-medium text-gray-800">{item.name}</div>
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-left">{item.status || "active"}</div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-left font-medium text-green-500">{item.wants||0}</div>
          </td>
          <td className="p-2 whitespace-nowrap">
            <div className="text-lg text-center"></div>
          </td>
        </tr>))}
      </tbody>
    </table>

</div>
}