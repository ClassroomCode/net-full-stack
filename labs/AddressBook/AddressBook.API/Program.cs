using AddressBook.API.DataAccess;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.Run(async context => {
    using var db = new NorthwindContext();
     
    var customer = db.Customers.First();

    await context.Response.WriteAsync(customer.CustomerID);
});

app.Run();