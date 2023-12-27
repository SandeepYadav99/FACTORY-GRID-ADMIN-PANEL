const DEPARTMENT_OPTIONS = [
    "Human Resources",
    "Finance",
    "Information Technology",
    "Marketing",
    "Sales",
    "Customer Relations",
    "Operations/Production",
    "Content Management",
    "Legal",
    "Customer Support",
    "Quality Assurance",
    "Administration",
  ];

  const formattedOptions = DEPARTMENT_OPTIONS.map((option) => ({
    id: option.toLowerCase().replace(/\s/g, "_"),
    name: option,
  }));
  
  export { formattedOptions };
//   export default DEPARTMENT_OPTIONS;