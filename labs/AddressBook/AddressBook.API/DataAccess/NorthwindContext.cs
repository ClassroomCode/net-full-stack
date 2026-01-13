using AddressBook.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.DataAccess;

public class NorthwindContext : DbContext
{
    public DbSet<Customer> Customers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Server=localhost;Database=Northwind;Integrated Security=True;TrustServerCertificate=True");
    }
}
