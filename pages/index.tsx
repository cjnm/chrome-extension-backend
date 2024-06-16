import DefaultLayout from "@/layouts/default";
import { sessionExist } from "@/utils/auth";
import { DeleteIcon, EyeIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { Link, Spinner, Accordion, AccordionItem } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { deleteAProduct, getAllProducts } from "@/utils/products";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import React from "react";

export default function IndexPage() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(true);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showingProductDetail, setShowingProductDetail] = useState('');

  const { push } = useRouter();

  useEffect(() => {
    setHasSession(sessionExist())
    setLoading(false);
    getAllProducts().then(response => {
      setProducts(response);
      setProductsLoading(false);
    })
  }, []);

  const viewProductDetail = (id: string, product: any) => {
    if(showingProductDetail === id) {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
      setShowingProductDetail('');
      return;
    } else if(showingProductDetail !== '' && showingProductDetail !== id) {
      const element = document.getElementById(showingProductDetail);
      if (element) {
        element.remove();
      }
      setShowingProductDetail('');
    }

    setShowingProductDetail(id);
    // Find the element with the specified data-id
    const element = document.querySelector(`[data-key="${id}"]`);

    // Create a new div element to contain the additional HTML content
    const newElement = document.createElement('tr');
    newElement.setAttribute('id', id);
    newElement.innerHTML = `
      <style>
        ul {
          list-style-type: none; /* Remove default list styles */
          padding: 0; /* Remove default padding */
        }
        ul li {
          text-align: left; /* Align list items to the left */
        }
        .container {
          display: flex;
        }
        .left-section {
          flex: 1;
          padding: 20px;
        }
        .right-section {
          flex: 1;
          padding: 20px;
        }
          table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
      </style>
      <td colspan="7">
         <div class="p-4 text-center border rounded-lg shadow sm:p-8">
         <div class="container">
            <section class="right-section">
               <table>
                  <thead>
                     <tr>
                        <th>Shippings</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>Delivery Charge</td>
                        <td>${product.delivery_charge || 'N/A'}</td>
                     </tr>
                     <tr>
                        <td>Delivery Time</td>
                        <td>${product.delivery_time || 'N/A'}</td>
                     </tr>
                     <tr>
                        <td>Delivery Type</td>
                        <td>${product.delivery_type || 'N/A'}</td>
                     </tr>
                     <tr>
                        <td>Return Policy</td>
                        <td>${product.return_policy || 'N/A'}</td>
                     </tr>
                  </tbody>
               </table>
            </section>
            <section class="left-section">
               <h2>Properties</h2>
               ${product.product_highlight}
            </section>
         </div>
      </td>
    `;

    // Insert the new element after the identified element
    element.insertAdjacentElement('afterend', newElement);
  }

  const deleteItem = (id: string) => {
    deleteAProduct(id).then(response => {
      getAllProducts().then(response => {
        setProducts(response);
        setProductsLoading(false);
      })
    })
  }

  if (loading) {
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex gap-3">
          <Spinner label="Loading..." color="warning" />
        </div>
      </section>
    </DefaultLayout>
  } if (hasSession && !loading) {
    return (
      <DefaultLayout>
        <section className="flex flex-col gap-4">
          <div className="inline-block">
            <p className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-white">Products</p>
          </div>
          {productsLoading ? <Spinner label="Loading products..." color="warning" /> : ''}
          {(!productsLoading && !products.length) ? 'No Products Found' : ''}
          {(!productsLoading && products.length)
            ? <Table aria-label="Example static collection table">
              <TableHeader>
                <TableColumn> </TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>Price</TableColumn>
                <TableColumn>Rating</TableColumn>
                <TableColumn>Seller</TableColumn>
                <TableColumn> </TableColumn>
                <TableColumn> </TableColumn>
              </TableHeader>
              <TableBody>
                {products.map((product) => {
                  return (
                    <TableRow key={product._id}>
                      <TableCell>
                        <Link href={product?.image || '#'} isExternal>
                          <Image alt={product?.name || ''} src={product?.image || ''} width={85} height={85} />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link href={product?.product_url || '#'} isExternal>
                          {product?.name || ''}
                        </Link>
                      </TableCell>
                      <TableCell width={'7%'}>{product?.price || ''}</TableCell>
                      <TableCell>{product?.rating || 'N/A'}</TableCell>
                      <TableCell><Link href={product?.seller_url || '#'} isExternal>{product?.seller || ''}</Link></TableCell>
                      <TableCell className="m-0 p-0">
                        {showingProductDetail !== product._id ? <EyeIcon onClick={() => viewProductDetail(product._id, product)} /> : <EyeSlashFilledIcon onClick={() => viewProductDetail(product._id, product)} />}
                      </TableCell>
                      <TableCell className="m-0 p-0">
                        <DeleteIcon onClick={() => deleteItem(product._id)} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
            : ''}
        </section>
      </DefaultLayout>
    );
  } else if (!loading && !hasSession) {
    push('/login');
  }
}
