using AddressBook.API.Auth;
using AddressBook.API.DataAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.ReferenceHandler =
      System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

builder.Services.AddDbContext<NorthwindContext>(options =>
  options.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=Northwind;Integrated Security=True;TrustServerCertificate=True"));

builder.Services.AddSingleton<TokenProvider>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options => {
      options.RequireHttpsMetadata = false;
      options.TokenValidationParameters = new TokenValidationParameters
      {
          IssuerSigningKey = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes("randomly-generated-client-secret")),
          ValidIssuer = "localhost:5000",
          ValidAudience = "localhost:5000"
      };
  });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler(app => {
        app.Run(async context => {
            await Results.Problem("An unexpected error occurred.").ExecuteAsync(context);
        });
    });
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

/*
app.MapGet("/customer", () =>
{
    using var db = new NorthwindContext();
    var customers = db.Customers.ToList();
    return customers;
});

app.MapGet("/customer/{id}", (string id) =>
{
    using var db = new NorthwindContext();
    var customer = db.Customers.Find(id);
    if (customer is null) return Results.NotFound();
    return Results.Ok(customer);
});
*/

app.Run();