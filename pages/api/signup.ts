// pages/api/signup.js

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, pseudonyme, password } = req.body;

    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/authentication/sign-up`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            pseudonyme,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return res
          .status(200)
          .json({ message: "User created successfully", data });
      } else {
        const errorData = await response.json();
        return res.status(response.status).json({ message: errorData.message });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong", error: error.toString() });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
