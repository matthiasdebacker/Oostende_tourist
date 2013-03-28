<?php
class AttractionsDAO
{
    function __construct(){
        $this->dbh = DatabasePDO::getInstance();
    }

    public function getAttractionsList(){
        try{
            // later nog via categoriën ophalen
            $sql = "SELECT * FROM maiv_tourist_attractions A";
            $stmt = $this->dbh->prepare($sql);
            $result = array();
            if($stmt->execute() !== false){
                while($row[] = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $result = $row;
                }
            }
            return $result;
        }catch (PDOException $e){
            return $e->getMessage();
        }

    }

    public function getDetailsById($id){

        try{
            $sql = "SELECT A.id,A.title,D.description,D.opening_hours,D.practical_info,C.address FROM maiv_tourist_attractions A
                INNER JOIN maiv_tourist_attractions_detail D
                ON A.id = D.attraction_id
                INNER JOIN maiv_tourist_attractions_coordinate C
                ON A.id = C.attraction_id
                WHERE A.id = :id";

            $stmt = $this->dbh->prepare($sql);
            $stmt->bindParam(':id',$id);
            $result = "";
            if($stmt->execute() !== false){
                $result = $stmt->fetchAll()[0];
            }
            return $result;
        }catch (PDOException $e){
            return $e->getMessage();
        }

    }

    public function getAllCoordinates(){

       try{
           $sql = "SELECT A.title,C.* FROM maiv_tourist_attractions_coordinate C
                   INNER JOIN maiv_tourist_attractions A
                   ON A.id = C.attraction_id";

           $stmt = $this->dbh->prepare($sql);
           $result = array();
           if($stmt->execute() !== false){
               while($row[] = $stmt->fetch(PDO::FETCH_ASSOC)){
                   $result = $row;
               }
           }
           return $result;
       }catch (PDOException $e){
           return $e->getMessage();
       }

    }
}

?>