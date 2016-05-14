// Render HTML code for an order summary
function order_summary(order_object) {

    // calculate price and tax amounts
    var price, tax; // more descriptive variable names than x and y
    switch(order_object.price_level) { // using switch intead of if statements for clarity and efficiency
        case: "free":
            price = 0;
            break;
        case: "discount":
            price = order_object.price * (1 - order_object.discount_percentage);
            // instead of order_object.price - (order_object.discount_percentage * order_object.price);
            break;
        case: "sale":
            price = order_object.price - order_object.markdown;
            break;
        default:
            price = order_object.price;
    }
    tax = (order_object.taxes_applicable ? order_object.tax : 0); // using (conditional? a: b) instead of if-else syntax to be clear and concise

    // set key value pairs for paragraph tags so we can iterate over them
    var dict = {};
    dict["Product"] = order_object.product_name;
    dict["Subtotal"] = (order_object.price_level == "free" ? "This order is free": price_str(price)); 
    dict["Tax"] = price_str(tax);
    dict["Order total"] = price_str(price + tax);
 
    // generate final html
    html = html_tag("h1", "Order summary"); 
    var headings = ["Product", "Subtotal", "Tax", "Order total"]; 
    // iterate over headings to print out, this is better than hard-coding and easier for making changes to the headings later, etc.
    // using the headings array because it makes sense for the headings to be ordered in this case
    // we can eliminate the headings array if we implement ordered dict, something like this: http://stackoverflow.com/questions/2798893/ordered-hash-in-javascript
    for (var i in headings) {
        var heading = headings[i]; 
        html += key_value_paragraph(heading, dict[heading]);
    }
    
    document.write(html);
}

// returns formatted price string
// can be changed easily later to format prices to decimal places/thousands
function price_str(price) {
    return "$" + price; 
}

// generates key value paragraph tag of the form:
// <p>key: value</p>
function key_value_paragraph(key, val) {
    return generate_html_tag('p', key + ": " + val);
}

// generate html tag of the form: 
// <tag>content</tag>
function html_tag(tag, content) {
    return "<" + tag + ">" + content + "</" + tag + ">";
}
