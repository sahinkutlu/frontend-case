// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import items from './items.json';

type Response = {
  data: string[]
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>,
) {
  const random = Math.floor(Math.random() * 10);
  if ((random) % 2 === 0) {
    res.status(400).json({ data: [] });
  }
  res.status(200).json({ data: items.data });
}
