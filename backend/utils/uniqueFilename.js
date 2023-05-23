const createName = (file) =>{
  const date = new Date(Date.now());
  const month = date.getMonth() + 1; // Months are zero-based, so we add 1
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Create a new formatted date string
  const formattedDate = `${month}-${day}-${year}---${hours}-${minutes}`;
  const uniqueFilename = formattedDate + '-' + file.originalname;
  // Output the new formatted date string
  return uniqueFilename;
}

module.exports = {
    createName
}