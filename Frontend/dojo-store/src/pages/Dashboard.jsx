import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { useAuth } from "../context/AuthContext";

import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import Table from "react-bootstrap/Table";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend);

const Dashboard = () => {
    const { logout } = useAuth();
    const [productData, setProductData] = useState({ name: "", price: "", stock: "" });
    const [products, setProducts] = useState([]);
    const [barChartData, setBarChartData] = useState(null);

    const [clientData, setClientData] = useState({ name: "", age: "", nit: "" });
    const [clients, setClients] = useState([]);
    const [pieChartData, setPieChartData] = useState(null);

    const handleInputChange = (setter) => (event) => {
        const { name, value } = event.target;
        setter((prev) => ({ ...prev, [name]: value }));
    };

    const fetchData = async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.json();
        } catch (error) {
            Swal.fire("Error", error.message || "Unexpected error occurred.", "error");
            throw error;
        }
    };

    const handleSubmit = async (url, data, successMessage, refreshCallback, resetData) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                Swal.fire("Éxito", successMessage, "success");
                refreshCallback();
                resetData(); // Limpiar campos
            } else {
                Swal.fire("Error", result.message || "Operación fallida.", "error");
            }
        } catch (error) {
            Swal.fire("Error", error.message || "Unexpected error occurred.", "error");
        }
    };

    const handleDelete = async (url, successMessage, refreshCallback) => {
        try {
            const response = await fetch(url, { method: "DELETE" });

            if (response.ok) {
                const result = await response.json();
                if (result.status === "success") {
                    Swal.fire("Éxito", successMessage, "success");
                    refreshCallback();
                } else {
                    Swal.fire("Error", result.message || "Operación fallida.", "error");
                }
            } else {
                Swal.fire("Error", "No se pudo completar la operación.", "error");
            }
        } catch (error) {
            Swal.fire("Error", error.message || "Unexpected error occurred.", "error");
        }
    };

    const updateProducts = async () => {
        const products = await fetchData("http://localhost:3005/store/products");
        setProducts(products);
    };

    const updateClients = async () => {
        const clients = await fetchData("http://localhost:3005/store/clients");
        setClients(clients);
    };

    useEffect(() => {
        updateProducts();
        updateClients();
    }, []);

    useEffect(() => {
        const sortedProducts = products.sort((a, b) => b.price - a.price);
        setBarChartData({
            labels: sortedProducts.map((p) => p.name),
            datasets: [
                {
                    label: "Precio",
                    data: sortedProducts.map((p) => p.price),
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.6)",
                        "rgba(54, 162, 235, 0.6)",
                        "rgba(255, 206, 86, 0.6)",
                        "rgba(75, 192, 192, 0.6)",
                        "rgba(153, 102, 255, 0.6)",
                        "rgba(255, 159, 64, 0.6)",
                    ],
                    borderWidth: 1,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                },
            ],
        });

        const minors = clients.filter((c) => c.age < 18).length;
        const adults = clients.filter((c) => c.age >= 18).length;
        setPieChartData({
            labels: ["Menores de Edad", "Mayores de Edad"],
            datasets: [
                {
                    data: [minors, adults],
                    backgroundColor: ["rgba(255, 99, 132, 0.6)", "rgba(54, 162, 235, 0.6)"],
                    borderWidth: 1,
                    borderColor: "rgba(0, 0, 0, 0.1)",
                },
            ],
        });
    }, [products, clients]);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard</h1>
                <button className="logout-button" onClick={logout}>
                    Cerrar Sesión
                </button>
            </header>

            <main className="dashboard-content">
                <div className="form-container">
                    <div className="form-section">
                        <h2>Crear Producto</h2>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del producto"
                                value={productData.name}
                                onChange={handleInputChange(setProductData)}
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Precio"
                                value={productData.price}
                                onChange={handleInputChange(setProductData)}
                            />
                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                value={productData.stock}
                                onChange={handleInputChange(setProductData)}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleSubmit(
                                        "http://localhost:3005/store/products",
                                        {
                                            ...productData,
                                            price: parseFloat(productData.price),
                                            stock: parseInt(productData.stock, 10),
                                        },
                                        "Producto creado exitosamente!",
                                        updateProducts,
                                        () => setProductData({ name: "", price: "", stock: "" })
                                    )
                                }
                                className="btn-submit"
                            >
                                Guardar
                            </button>
                        </form>
                    </div>

                    <div className="form-section">
                        <h2>Crear Cliente</h2>
                        <form>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre del cliente"
                                value={clientData.name}
                                onChange={handleInputChange(setClientData)}
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Edad"
                                value={clientData.age}
                                onChange={handleInputChange(setClientData)}
                            />
                            <input
                                type="text"
                                name="nit"
                                placeholder="NIT"
                                value={clientData.nit}
                                onChange={handleInputChange(setClientData)}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleSubmit(
                                        "http://localhost:3005/store/clients",
                                        {
                                            ...clientData,
                                            age: parseInt(clientData.age, 10),
                                        },
                                        "Cliente creado exitosamente!",
                                        updateClients,
                                        () => setClientData({ name: "", age: "", nit: "" })
                                    )
                                }
                                className="btn-submit"
                            >
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>

                <div className="charts-section">
                    <div className="chart" style={{ height: "400px", marginBottom: "40px" }}>
                        <h2>Productos Ordenados por Precio</h2>
                        {barChartData ? (
                            <Bar
                                data={barChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                            labels: {
                                                font: {
                                                    size: 14,
                                                },
                                            },
                                        },
                                    },
                                    scales: {
                                        x: {
                                            ticks: {
                                                font: {
                                                    size: 12,
                                                },
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                font: {
                                                    size: 12,
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p>Cargando gráfica...</p>
                        )}
                    </div>
                    <div className="chart" style={{ height: "400px", marginBottom: "40px" }}>
                        <h2>Clientes: Menores vs Mayores de Edad</h2>
                        {pieChartData ? (
                            <Pie
                                data={pieChartData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "top",
                                            labels: {
                                                font: {
                                                    size: 14,
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p>Cargando gráfica...</p>
                        )}
                    </div>
                </div>


                <div className="tables-section">
                    <h2 >Productos</h2>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    handleDelete(
                                                        `http://localhost:3005/store/products/${product.id}`,
                                                        "Producto eliminado exitosamente!",
                                                        updateProducts
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td align="center" colSpan="5">
                                        <h1>No hay productos</h1>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <h2>Clientes</h2>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>NIT</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.length > 0 ? (
                                clients.map((client) => (
                                    <tr key={client.id}>
                                        <td>{client.id}</td>
                                        <td>{client.name}</td>
                                        <td>{client.age}</td>
                                        <td>{client.nit}</td>
                                        <td>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    handleDelete(
                                                        `http://localhost:3005/store/clients/${client.id}`,
                                                        "Cliente eliminado exitosamente!",
                                                        updateClients
                                                    )
                                                }
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td align="center" colSpan="5">
                                        <h1>No hay clientes</h1>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
            </main>
        </div>

    );
};

export default Dashboard;

