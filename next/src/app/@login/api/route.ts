export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request, res: NextApiResponse) {
  try {
    const json = await req.json();
  } catch (error) {
    console.error(error);
  }
  return new Response();
  // res.status(405).json({ error: "Method not allowed" });
}
