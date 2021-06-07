<?php
  require_once "../../db_connectionX.php";
  $c = new PDO($db_pg, $user, $password);
  $s="insert into figures(title) values (:s_t)";
	$r = $c->prepare($s);
	$r->bindParam(':s_t', $_POST['title_html']);
	$r->execute();
  $s="SELECT * FROM figures ORDER BY id DESC LIMIT 1";
	$r = $c->prepare($s);
  $r->execute();
  $figure_id = $r->fetchColumn(0);
  $colors = $_POST['colors'];
  $edge_counts = $_POST['edge_counts'];
  for($i = 0; $i < count($edge_counts); $i++){
    $shape_index = $i + 1;
    $s="insert into figure_descriptors(figure_id, i, edge_count, color) values (:s_id, :s_i, :s_ec, :s_c)";
    $r = $c->prepare($s);
    $r->bindParam(':s_id', $figure_id);
    $r->bindParam(':s_i', $shape_index);
    $r->bindParam(':s_ec', $edge_counts[$i]);
    $r->bindParam(':s_c', $colors[$i]);
    $r->execute();
  }
  $r->closeCursor();
	$c->null;
?>