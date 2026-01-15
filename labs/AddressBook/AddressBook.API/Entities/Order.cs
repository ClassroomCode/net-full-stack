using System.Text.Json.Serialization;

namespace AddressBook.API.Entities;

public class Order
{
    public int OrderID { get; set; }
    public DateTime? OrderDate { get; set; }
    public DateTime? ShippedDate { get; set; }

    public string CustomerID { get; set; } = string.Empty;
    public Customer? Customer { get; set; }
}
