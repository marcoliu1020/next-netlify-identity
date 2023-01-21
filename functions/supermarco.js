export async function handler() {
  console.log("function ran");

  const data = { name: "Marco", age: 35, job: "plumber" };

  // return response to browser
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
