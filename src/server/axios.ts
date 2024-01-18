import axios from "axios";

export const AME_API = axios.create({
  baseURL: `${process.env.AME_API}`,
})

export async function upsertCustomer(customer: any) {
  try {
    await AME_API.post(`/users/customer`, customer)
  } catch (error) {
    console.error(error)
  }
}