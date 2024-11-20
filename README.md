# Upgrad Eshop

## Pre-requisites
1. NodeJS version 18+
1. CORS Unblock plugin
If you are running this project from `localhost` then you would need to unblock CORS to allow reading the response headers. You can use any plugin of your choice. Here is the one which works. 

    1. Plugin Name: **CORS Unblock**
    1. URL : https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino
    1. Steps to configure CORS unblock.
        1. download CORS unblock extension from extension store shown in the image ![Alt Text](https://i.imgur.com/TDnvCOt.png) 
        1. Then pin it in the URL bar after that right click the icon and make sure Enable Access-Control-[Allow/Expose]-header is checked as shown in the ![Alt Text]( https://i.imgur.com/zUFmttI.png)
        1. then start the CORS extension by clicking on it. You should see an orange light on it.

## Running the project
After you clone the project you need to run this command from the root folder to be able to run it.
```
npm install
npm start
```

`npm install` is required to install the dependencies.

Post this the application will be available at http://localhost:3000

## Demo video
[![Video Preview](https://drive.google.com/thumbnail?id=1--4SIhjWg_V3tZvoGWA43GtmTOYOieeJ)](https://drive.google.com/file/d/1--4SIhjWg_V3tZvoGWA43GtmTOYOieeJ/view)

## Evaluation Rubrics

### **Code Functionality**
- ✅ Not specified.

### **Appearance of Header**
1. ✅ The background of the header has the colour #3f51b5.
2. ✅ The logo is positioned properly and it looks like the one shown in the project statement.
3. ✅ The search box is positioned properly and it looks like the one shown in the project statement.
4. ✅ The Login and Sign up links are positioned properly and look like the ones shown in the project statement.

### **Functionality of Search Box**
- ✅ The search box performs the functionality of searching a product by its name as mentioned in the project statement.

### **Functionality of Login and Sign-up Links**
- ✅ On clicking the Login link, a Sign-in page appears, and a Sign-up page appears on clicking the Sign-up link.

### **Appearance of Sign-in and Sign-up Pages**
1. ✅ The Sign-in page displays a form with two text fields (Email & Password) and a 'Sign-in' button.
2. ✅ The Sign-up page displays a form with fields (First Name, Last Name, Email Address, Password, Confirm Password, Contact Number) and a 'Sign-up' button.

### **Functionality of Sign-up Form**
1. ✅ The form validation works properly for all fields in the signup form.
2. ✅ When the signup button is clicked, an API call is made to the endpoint mentioned in the project statement.
3. ✅ Successful or failed signup is handled properly with user messages as mentioned in the project statement.

### **Functionality of Sign-in Form**
1. ✅ The form validation works properly for all fields in the login form.
2. ✅ When the Sign-in button is clicked, an API call is made to the endpoint mentioned in the project statement.
3. ✅ Successful or failed login is handled properly with user messages as mentioned in the project statement.

### **Appearance of the Product Categories**
- ✅ The categories are listed as mentioned in the problem statement.

### **Functionality of the Product Categories**
1. ✅ All the products are displayed when the Home button is pressed, which is the default selection on page load.
2. ✅ On clicking a category, only the products belonging to that category are loaded.
3. ✅ An API call is made to fetch the products as mentioned in the project statement.

### **Appearance of the Sort Menu**
- ✅ The Sort menu is the same as mentioned in the project statement.

### **Functionality of the Sort Menu**
1. ✅ The sort menu has the four sorting options as mentioned in the project statement.
2. ✅ The sorting options function correctly as per the project statement.

### **Appearance of the Products**
- ✅ The products are displayed as per the project statement.

### **Appearance of the Product Details Page**
1. ✅ The product details are mentioned as per the project statement.
2. ✅ An API call is made to fetch a specific product as mentioned in the project statement.

### **Functionality of the Product Details Page**
1. ✅ A user routes to the product details page on the click of a 'Buy' button of the product.
2. ✅ There is a 'Place Order' button on the product details page which routes to the create order page.

### **Appearance of the Create Order Page**
1. ✅ There is a stepper menu with 3 steps to place the order.
2. ✅ The first step displays the item the customer wants to order as per the project statement.
3. ✅ The second step adds the address as per the project statement.
4. ✅ The third step reviews the order as per the project statement.

### **Functionality of First Step**
1. ✅ Only the product chosen by the user is shown.
2. ✅ On clicking the Next button, the user is navigated to the next step.

### **Functionality of Second Step**
1. ✅ There is a form to capture user address and a dropdown to choose from existing addresses.
2. ✅ All fields and validations are as per the project statement.
3. ✅ An API call is made to add the address as mentioned in the project statement.
4. ✅ On clicking the Next or Back button, the user is navigated to the next or previous step.

### **Functionality of Third Step**
1. ✅ The product that the user wants to buy is displayed as per the project statement.
2. ✅ The address that the user added is displayed as per the project statement.
3. ✅ On clicking the Place Order button, the user is redirected to the products page with a success message, and the Back button redirects to the second step.

### **Appearance of the Manage Products Page**
1. ✅ When the Admin user logs in, the "Add Product" link in the header appears.
2. ✅ The modify and delete icons are present on every product card.

### **Functionality of the Manage Products Page**
1. ✅ On clicking the Add Product link, the Add Product page is displayed with a form containing all product details fields.
2. ✅ When the edit icon is clicked, the Modify Product page is displayed with a form containing all product details fields.
3. ✅ When the delete icon is clicked, a modal box appears.

### **Appearance and Functionality of Add Product Page**
1. ✅ The page contains a form.
2. ✅ All fields and validations are as per the project statement.
3. ✅ An API call is made to add the product as mentioned in the project statement.
4. ✅ The added product is displayed on the UI.

### **Appearance and Functionality of Delete Products Modal**
1. ✅ The modal has details as per the project statement.
2. ✅ The buttons in the modal function as per the problem statement.
3. ✅ An API call is made to delete the product as mentioned in the project statement.
4. ✅ The deleted product is not displayed on the UI.

### **Appearance and Functionality of Modify Product Page**
1. ✅ The page contains a form.
2. ✅ All fields have prefilled values and validations as per the project statement.
3. ✅ An API call is made to modify the product as mentioned in the project statement.
4. ✅ The modified product is displayed on the UI.

### **Adherence to Coding Guidelines**
- ✅ Not specified.

### **Best Coding Practices**
1. ✅ All features are implemented using components, and the code is formatted correctly with appropriate spacing and indentation.
2. ✅ The web application is configured properly with correct folder structure as per guidelines.
3. ✅ The code is well documented with proper comments for clarity.
4. ✅ The code is committed incrementally with proper commit messages.

