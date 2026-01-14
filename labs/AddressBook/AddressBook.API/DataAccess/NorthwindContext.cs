using AddressBook.API.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Runtime.InteropServices.Swift;

namespace AddressBook.API.DataAccess;

public class NorthwindContext : DbContext
{
    public NorthwindContext(DbContextOptions<NorthwindContext> options)
        : base(options) { }

    public DbSet<Customer> Customers { get; set; }
}
