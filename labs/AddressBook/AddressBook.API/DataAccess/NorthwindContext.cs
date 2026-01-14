using AddressBook.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace AddressBook.API.DataAccess;

public class NorthwindContext : DbContext
{
    public NorthwindContext(DbContextOptions<NorthwindContext> options)
        : base(options) { }

    public DbSet<Customer> Customers { get; set; }
}
