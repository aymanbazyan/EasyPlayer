export const getJSON = async function (url, errMsg = "Something went wrong") {
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
