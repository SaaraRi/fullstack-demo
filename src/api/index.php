<?php include "DBConnect.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$objectDB = new DBConnect;
$conn = $objectDB->connect();

$user = file_get_contents('php://input');
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "POST":
        $user = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO users(id, name, email, mobile, created_at, updated_at) VALUES(null, :name, :email,:mobile, :created_at, :updated_at)";
        $stmt = $conn->prepare($sql);
        $created_at = date('Y-m-d');
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':created_at', $created_at);
        $stmt->bindParam(':updated_at', $updated_at);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create a record'];
        }
        echo json_encode($response);
        break;

    case "GET":
        $sql = "SELECT * FROM users";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;

    case "DELETE":
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete record'];
            }
            echo json_encode($response);
        }
        break;

    case "PUT":
        $user = json_decode(file_get_contents("php://input"));
        $sql = "UPDATE users SET name = :name, email = :email, mobile = :mobile, updated_at = :updated_at WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $user->id);
        $stmt->bindParam(':name', $user->name);
        $stmt->bindParam(':email', $user->email);
        $stmt->bindParam(':mobile', $user->mobile);
        $stmt->bindParam(':updated_at', $updated_at);
        echo json_encode(['status' => $stmt->execute() ? 1 : 0]);
        break;

    default;
        break;
};
