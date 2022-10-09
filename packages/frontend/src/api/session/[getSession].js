// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req, res) {
  try {
    // ${req.query.getStream} is getting from /stream/[getStream].js
    const response = await fetch(`https://livepeer.studio/api/session/${req.query.getSession}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer a5451faf-8431-451c-a0b4-0877aa3e8613`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).send('Error');
  }
}
