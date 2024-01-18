// const fetchInExData = async (route, setDataFunction) => {
//     try {
//       const response = await axios.get(`${process.env.BASE_URL}/${route}`);
//       const data = response.data.data;

//       // Convert the string to a function reference and call it
//       setDataFunction(data);
//     } catch (error) {
//       // Handle error if necessary
//     }
//   }

//   useEffect(() => {
//     // Fetch incomes data
//     fetchInExData('incomes', setIncome);

//     // Fetch expenses data
//     fetchInExData('expenses', setExpense);
//   }, []); // Run once when the component mounts
//   // Run once when the component mounts
