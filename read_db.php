<?php
	require_once "../../db_connectionX.php";
  $conn = new PDO($db_pg, $user, $password);
  $sql = "select * from figures";
  $ra = $conn->query($sql);
  $new_arr1 = [];
  foreach ($ra as $row) {
    array_push($new_arr1, $row);
  }
  $sql = "select * from figure_descriptors";
  $rb = $conn->query($sql);
  $new_arr2 = [];
  foreach ($rb as $row) {
    array_push($new_arr2, $row);
  }
?>
<script type="text/javascript">
  var figures = <?php echo json_encode($new_arr1); ?>; //cursed ass language should burn in hell for all i care
	var descriptors = <?php echo json_encode($new_arr2); ?>;
</script>